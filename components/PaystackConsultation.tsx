"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: PaystackConfig) => { openIframe: () => void };
    };
  }
}

interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  metadata: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  callback: (response: { reference: string }) => void;
  onClose: () => void;
}

interface BookingResult {
  reference: string;
  tier: string;
  amount: string;
}

const consultationOptions = [
  {
    id: "quick",
    label: "Quick Call",
    duration: "30 minutes",
    priceKobo: 1500000,
    display: "₦15,000",
    description: "Focused Q&A on your project, tech stack, or idea validation.",
    features: [
      "30-min Zoom/Google Meet",
      "Project scoping",
      "Tech recommendations",
    ],
    popular: false,
  },
  {
    id: "standard",
    label: "Standard Session",
    duration: "1 hour",
    priceKobo: 2500000,
    display: "₦25,000",
    description:
      "Deep-dive into architecture, code review, or full product strategy.",
    features: [
      "60-min session",
      "Architecture review",
      "Written summary after",
      "1 follow-up question via email",
    ],
    popular: true,
  },
  {
    id: "extended",
    label: "Extended Workshop",
    duration: "2 hours",
    priceKobo: 4500000,
    display: "₦45,000",
    description:
      "Full workshop — build a plan, review code, define an entire MVP roadmap.",
    features: [
      "2-hour session",
      "Comprehensive project audit",
      "MVP roadmap document",
      "2 weeks follow-up support",
    ],
    popular: false,
  },
];

type Step = "select" | "details" | "verifying" | "success" | "error";

export default function PaystackConsultation() {
  const [selectedTier, setSelectedTier] = useState(consultationOptions[1]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [step, setStep] = useState<Step>("select");
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"name" | "email", string>>
  >({});

  useEffect(() => {
    if (document.getElementById("paystack-script")) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "paystack-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => toast.error("Payment system failed to load. Please refresh.");
    document.head.appendChild(script);
  }, []);

  function validate(): boolean {
    const errs: Partial<Record<"name" | "email", string>> = {};
    if (!name.trim() || name.trim().length < 2) errs.name = "Please enter your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Please enter a valid email address.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function verifyPayment(reference: string) {
    setStep("verifying");

    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          tier: selectedTier.label,
          topic: topic.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle rate limiting specifically
        if (res.status === 429) {
          setErrorMsg(data.error || "Too many requests. Please wait a moment.");
        } else if (res.status === 409) {
          setErrorMsg("This payment has already been processed.");
        } else {
          setErrorMsg(
            data.error ||
              "We could not verify your payment. Please contact David directly with your reference."
          );
        }
        setStep("error");
        return;
      }

      setBookingResult(data.booking);
      setStep("success");
    } catch {
      setErrorMsg(
        "Network error during verification. Please contact David with reference: " + reference
      );
      setStep("error");
    }
  }

  function handlePayment() {
    if (!validate()) return;

    if (!scriptLoaded || !window.PaystackPop) {
      toast.error("Payment system is still loading. Please try again in a moment.");
      return;
    }

    const reference = `DB-CONSULT-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: email.trim().toLowerCase(),
      amount: selectedTier.priceKobo,
      currency: "NGN",
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: "Customer Name", variable_name: "name", value: name.trim() },
          { display_name: "Tier", variable_name: "tier", value: selectedTier.label },
          { display_name: "Topic", variable_name: "topic", value: topic || "Not specified" },
        ],
      },
      callback: (response) => {
        // Paystack confirmed payment on their end — now verify server-side
        verifyPayment(response.reference);
      },
      onClose: () => {
        if (step !== "verifying" && step !== "success") {
          toast("Payment window closed. No charge was made.", { icon: "ℹ️" });
        }
      },
    });

    handler.openIframe();
  }

  // ── Success state ──
  if (step === "success" && bookingResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-10 text-center max-w-md mx-auto border border-emerald-500/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        >
          <CheckCircle size={64} className="text-emerald-400 mx-auto mb-5" />
        </motion.div>
        <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white mb-2">
          Booking confirmed!
        </h3>
        <p className="text-stone-500 dark:text-stone-400 mb-4 text-sm">
          A confirmation email has been sent to{" "}
          <span className="text-brand-500 font-semibold">{email}</span>.
          David will reach out within 12 hours to schedule your session.
        </p>
        <div className="glass rounded-2xl p-4 mb-6 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-stone-400">Package</span>
            <span className="font-semibold text-stone-900 dark:text-white">
              {bookingResult.tier}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-400">Amount paid</span>
            <span className="font-semibold text-emerald-400">
              {bookingResult.amount}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-400">Reference</span>
            <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
              {bookingResult.reference}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            setStep("select");
            setBookingResult(null);
            setName("");
            setEmail("");
            setTopic("");
          }}
          className="text-brand-500 text-sm font-semibold hover:underline"
        >
          Book another session
        </button>
      </motion.div>
    );
  }

  // ── Error state ──
  if (step === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-10 text-center max-w-md mx-auto border border-red-500/20"
      >
        <AlertCircle size={64} className="text-red-400 mx-auto mb-5" />
        <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white mb-3">
          Verification failed
        </h3>
        <p className="text-stone-500 dark:text-stone-400 mb-6 text-sm leading-relaxed">
          {errorMsg}
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => { setStep("select"); setErrorMsg(""); }}
            className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all"
          >
            Try again
          </button>
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_DAVID_EMAIL || "david@davidbriggs.dev"}?subject=Consultation Booking Issue`}
            className="glass border border-white/20 text-stone-700 dark:text-stone-300 px-6 py-3 rounded-full font-semibold text-sm transition-all"
          >
            Contact David
          </a>
        </div>
      </motion.div>
    );
  }

  // ── Verifying state ──
  if (step === "verifying") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-3xl p-10 text-center max-w-md mx-auto"
      >
        <Loader2 size={48} className="text-brand-500 mx-auto mb-5 animate-spin" />
        <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white mb-2">
          Verifying payment...
        </h3>
        <p className="text-stone-400 text-sm">
          Please don't close this tab. This usually takes 5–10 seconds.
        </p>
      </motion.div>
    );
  }

  // ── Main UI ──
  return (
    <div className="space-y-8">
      {/* Tier cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {consultationOptions.map((option) => {
          const isSelected = selectedTier.id === option.id;
          return (
            <motion.div
              key={option.id}
              onClick={() => setSelectedTier(option)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative glass rounded-3xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                isSelected
                  ? "border-brand-500 shadow-[0_0_30px_rgba(249,115,22,0.2)]"
                  : "border-transparent hover:border-brand-500/30"
              }`}
            >
              {option.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-display font-bold text-stone-900 dark:text-white">
                    {option.label}
                  </h4>
                  <p className="text-stone-400 text-xs">{option.duration}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? "border-brand-500 bg-brand-500"
                      : "border-stone-400 dark:border-stone-600"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              <p className="text-2xl font-black text-stone-900 dark:text-white mb-3">
                {option.display}
              </p>

              <p className="text-stone-500 dark:text-stone-400 text-sm mb-4 leading-relaxed">
                {option.description}
              </p>

              <ul className="space-y-1.5">
                {option.features.map((f) => (
                  <li
                    key={f}
                    className="text-xs text-stone-500 dark:text-stone-400 flex items-start gap-2"
                  >
                    <CheckCircle
                      size={12}
                      className="text-brand-500 flex-shrink-0 mt-0.5"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Details + payment form */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTier.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="glass rounded-3xl p-7 max-w-xl mx-auto"
        >
          <div className="flex items-center justify-between mb-5">
            <h4 className="font-display font-bold text-stone-900 dark:text-white">
              Your Details
            </h4>
            <span className="text-brand-500 font-bold text-sm">
              {selectedTier.display} · {selectedTier.duration}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="Your full name *"
                className={`w-full bg-stone-100 dark:bg-stone-900 border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                  fieldErrors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-stone-200 dark:border-stone-800 focus:border-brand-500"
                }`}
              />
              {fieldErrors.name && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="Email address (for confirmation) *"
                className={`w-full bg-stone-100 dark:bg-stone-900 border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                  fieldErrors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-stone-200 dark:border-stone-800 focus:border-brand-500"
                }`}
              />
              {fieldErrors.email && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {fieldErrors.email}
                </p>
              )}
            </div>

            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What would you like to discuss? (optional but helpful)"
              rows={3}
              className="w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-500 transition-colors resize-none"
            />

            <button
              onClick={handlePayment}
              disabled={!scriptLoaded}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-full font-bold transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]"
            >
              {!scriptLoaded ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Loading payment system...
                </>
              ) : (
                <>
                  <Calendar size={16} />
                  Pay {selectedTier.display} & Book Session
                </>
              )}
            </button>

            <p className="text-stone-400 text-xs text-center">
              Secured by Paystack · Nigerian Naira (₦) · Instant confirmation email
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
