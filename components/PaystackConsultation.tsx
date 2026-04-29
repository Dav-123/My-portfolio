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
  metadata: { custom_fields: Array<{ display_name: string; variable_name: string; value: string }> };
  callback: (response: { reference: string }) => void;
  onClose: () => void;
}

interface BookingResult { reference: string; tier: string; amount: string; }

const consultationOptions = [
  { id: "quick", label: "Quick Call", duration: "30 minutes", priceKobo: 1500000, display: "₦15,000", description: "Focused Q&A on your project, tech stack, or idea validation.", features: ["30-min Zoom/Google Meet", "Project scoping", "Tech recommendations"], popular: false },
  { id: "standard", label: "Standard Session", duration: "1 hour", priceKobo: 2500000, display: "₦25,000", description: "Deep-dive into architecture, code review, or full product strategy.", features: ["60-min session", "Architecture review", "Written summary after", "1 follow-up question via email"], popular: true },
  { id: "extended", label: "Extended Workshop", duration: "2 hours", priceKobo: 4500000, display: "₦45,000", description: "Full workshop -- build a plan, review code, define an entire MVP roadmap.", features: ["2-hour session", "Comprehensive project audit", "MVP roadmap document", "2 weeks follow-up support"], popular: false },
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
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"name" | "email", string>>>({});

  useEffect(() => {
    if (document.getElementById("paystack-script")) { setScriptLoaded(true); return; }
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
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = "Please enter a valid email address.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function verifyPayment(reference: string) {
    setStep("verifying");
    try {
      const res = await fetch("/api/payment/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reference, name: name.trim(), email: email.trim().toLowerCase(), tier: selectedTier.label, topic: topic.trim() || undefined }) });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 429) setErrorMsg(data.error || "Too many requests. Please wait.");
        else if (res.status === 409) setErrorMsg("This payment has already been processed.");
        else setErrorMsg(data.error || "We could not verify your payment. Please contact David directly.");
        setStep("error"); return;
      }
      setBookingResult(data.booking); setStep("success");
    } catch { setErrorMsg("Network error. Please contact David with reference: " + reference); setStep("error"); }
  }

  function handlePayment() {
    if (!validate()) return;
    if (!scriptLoaded || !window.PaystackPop) { toast.error("Payment system is still loading."); return; }
    const reference = `DB-CONSULT-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!, email: email.trim().toLowerCase(), amount: selectedTier.priceKobo, currency: "NGN", ref: reference,
      metadata: { custom_fields: [{ display_name: "Customer Name", variable_name: "name", value: name.trim() }, { display_name: "Tier", variable_name: "tier", value: selectedTier.label }, { display_name: "Topic", variable_name: "topic", value: topic || "Not specified" }] },
      callback: (response) => { verifyPayment(response.reference); },
      onClose: () => { if (step !== "verifying" && step !== "success") { toast("Payment window closed. No charge was made.", { icon: "ℹ️" }); } },
    });
    handler.openIframe();
  }

  const inputBase = "w-full bg-stone-100 dark:bg-stone-900 border rounded-xl px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-brand-500/20";

  if (step === "success" && bookingResult) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 sm:p-10 text-center max-w-md mx-auto !border-emerald-500/20">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}>
          <CheckCircle size={56} className="text-emerald-400 mx-auto mb-4 sm:mb-5" />
        </motion.div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-2">Booking confirmed!</h3>
        <p className="text-stone-500 dark:text-stone-400 mb-3 sm:mb-4 text-xs sm:text-sm">A confirmation email has been sent to <span className="text-brand-500 font-semibold">{email}</span>. David will reach out within 12 hours.</p>
        <div className="glass rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 text-left space-y-2">
          <div className="flex justify-between text-xs sm:text-sm"><span className="text-stone-400">Package</span><span className="font-semibold text-stone-900 dark:text-white">{bookingResult.tier}</span></div>
          <div className="flex justify-between text-xs sm:text-sm"><span className="text-stone-400">Amount paid</span><span className="font-semibold text-emerald-400">{bookingResult.amount}</span></div>
          <div className="flex justify-between text-xs sm:text-sm"><span className="text-stone-400">Reference</span><span className="font-mono text-[10px] sm:text-xs text-stone-500 dark:text-stone-400">{bookingResult.reference}</span></div>
        </div>
        <button onClick={() => { setStep("select"); setBookingResult(null); setName(""); setEmail(""); setTopic(""); }} className="text-brand-500 text-xs sm:text-sm font-semibold hover:underline">Book another session</button>
      </motion.div>
    );
  }

  if (step === "error") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 sm:p-10 text-center max-w-md mx-auto !border-red-500/20">
        <AlertCircle size={56} className="text-red-400 mx-auto mb-4 sm:mb-5" />
        <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-2 sm:mb-3">Verification failed</h3>
        <p className="text-stone-500 dark:text-stone-400 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">{errorMsg}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => { setStep("select"); setErrorMsg(""); }} className="bg-brand-500 hover:bg-brand-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all">Try again</button>
          <a href={`mailto:${process.env.NEXT_PUBLIC_DAVID_EMAIL || "david@davidbriggs.dev"}?subject=Consultation Booking Issue`} className="glass border border-white/20 text-stone-700 dark:text-stone-300 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all">Contact David</a>
        </div>
      </motion.div>
    );
  }

  if (step === "verifying") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6 sm:p-10 text-center max-w-md mx-auto">
        <Loader2 size={40} className="text-brand-500 mx-auto mb-4 sm:mb-5 animate-spin" />
        <h3 className="font-display text-lg sm:text-xl font-bold text-stone-900 dark:text-white mb-2">Verifying payment...</h3>
        <p className="text-stone-400 text-xs sm:text-sm">Please don&apos;t close this tab. This usually takes 5-10 seconds.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid sm:grid-cols-3 gap-3 sm:gap-5">
        {consultationOptions.map((option) => {
          const isSelected = selectedTier.id === option.id;
          return (
            <motion.div key={option.id} onClick={() => setSelectedTier(option)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className={`relative glass-card p-4 sm:p-6 cursor-pointer transition-all duration-300 !border-2 ${
                isSelected ? "!border-brand-500 shadow-[0_0_30px_rgba(249,115,22,0.2)]" : "!border-transparent hover:!border-brand-500/30"
              }`}
            >
              {option.popular && (
                <span className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-0.5 sm:py-1 rounded-full whitespace-nowrap">Most Popular</span>
              )}
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div>
                  <h4 className="font-display font-bold text-stone-900 dark:text-white text-sm sm:text-base">{option.label}</h4>
                  <p className="text-stone-400 text-[10px] sm:text-xs">{option.duration}</p>
                </div>
                <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${isSelected ? "border-brand-500 bg-brand-500" : "border-stone-400 dark:border-stone-600"}`}>
                  {isSelected && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />}
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white mb-2 sm:mb-3">{option.display}</p>
              <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{option.description}</p>
              <ul className="space-y-1 sm:space-y-1.5">
                {option.features.map((f) => (
                  <li key={f} className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 flex items-start gap-1.5 sm:gap-2">
                    <CheckCircle size={11} className="text-brand-500 flex-shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={selectedTier.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="glass-card p-5 sm:p-7 max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h4 className="font-display font-bold text-stone-900 dark:text-white text-sm sm:text-base">Your Details</h4>
            <span className="text-brand-500 font-bold text-xs sm:text-sm">{selectedTier.display} · {selectedTier.duration}</span>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">Full Name <span className="text-red-400">*</span></label>
              <input value={name} onChange={(e) => { setName(e.target.value); if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined })); }} placeholder="Your full name"
                className={`${inputBase} ${fieldErrors.name ? "border-red-500 focus:border-red-500" : "border-stone-200 dark:border-stone-800 focus:border-brand-500"}`} />
              {fieldErrors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {fieldErrors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">Email <span className="text-red-400">*</span></label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined })); }} placeholder="Email address for confirmation"
                className={`${inputBase} ${fieldErrors.email ? "border-red-500 focus:border-red-500" : "border-stone-200 dark:border-stone-800 focus:border-brand-500"}`} />
              {fieldErrors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {fieldErrors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">Topic (optional)</label>
              <textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="What would you like to discuss?" rows={3}
                className={`${inputBase} border-stone-200 dark:border-stone-800 focus:border-brand-500 resize-none`} />
            </div>
            <button onClick={handlePayment} disabled={!scriptLoaded}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]">
              {!scriptLoaded ? (<><Loader2 size={16} className="animate-spin" />Loading payment system...</>) : (<><Calendar size={16} />Pay {selectedTier.display} & Book Session</>)}
            </button>
            <p className="text-stone-400 text-[10px] sm:text-xs text-center">Secured by Paystack · Nigerian Naira (₦) · Instant confirmation email</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
