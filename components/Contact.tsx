"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";

const ContactSchema = z.object({
  name: z.string().min(2, "Name required").max(100),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject required").max(200),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z
    .string()
    .min(20, "Please describe your project (min 20 characters)")
    .max(5000),
});

type ContactFormData = z.infer<typeof ContactSchema>;

const projectTypes = [
  "Web Application",
  "Mobile App",
  "AI/ML Integration",
  "Backend / API",
  "Consulting",
  "Social Impact Tech",
  "Other",
];

const inputClass =
  "w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-500 transition-colors placeholder:text-stone-400";

const errorInputClass =
  "w-full bg-stone-100 dark:bg-stone-900 border border-red-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors placeholder:text-stone-400";

export default function Contact() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setGlobalError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setGlobalError(json.error || "Too many messages sent. Please wait before trying again.");
          toast.error(json.error || "Rate limit reached.");
        } else if (res.status === 422 && json.fields) {
          // Field-level errors from server (shouldn't happen with Zod on frontend, but good to handle)
          setGlobalError("Please check your inputs and try again.");
          toast.error("Validation error.");
        } else {
          setGlobalError(json.error || "Something went wrong. Please try again.");
          toast.error("Message failed to send.");
        }
        return;
      }

      toast.success("🚀 Message sent! David will respond within 24–48 hours.");
      reset();
    } catch {
      setGlobalError(
        "Network error. Please email david directly at the address shown below."
      );
      toast.error("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="py-28 px-6 bg-stone-50/50 dark:bg-stone-950/50"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-4">
            Start a Conversation
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-stone-900 dark:text-white mb-4">
            Hire Me / Get In Touch
          </h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
            Have a project in mind? Want to collaborate? Just want to say hi?
            David typically responds within 24–48 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-3xl p-7">
              <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white mb-5">
                Connect With David
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:david@davidbriggs.dev"
                  className="flex items-center gap-3 text-stone-600 dark:text-stone-400 hover:text-brand-500 dark:hover:text-brand-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <Mail size={18} className="text-brand-500" />
                  </div>
                  <span className="text-sm">davidbriggd478@gmail.com</span>
                </a>

                {[
                  {
                    icon: Github,
                    label: "GitHub",
                    href: "https://github.com/dav-123",
                    sub: "github.com/dav-123",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/david-briggs-bb5b4a379",
                    sub: "linkedin.com/in/davidbriggs",
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    href: "https://www.instagram.com/davidbriggs001?igsh=MXN1cG13ZGY4dDc0ZA==",
                    sub: "@davidbriggs001",
                  },
                  {
                    icon: Facebook,
                    label: "Facebook",
                    href: "https://www.facebook.com/profile.php?id=100089440026395",
                    sub: "facebook.com/DavidBriggs",
                  },
                ].map(({ icon: Icon, label, href, sub }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-stone-600 dark:text-stone-400 hover:text-brand-500 dark:hover:text-brand-500 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-900 flex items-center justify-center group-hover:bg-brand-500/10 transition-colors">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-stone-400">{sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-7">
              <p className="text-brand-500 font-semibold text-xs tracking-widest uppercase mb-2">
                Typical Response
              </p>
              <p className="font-display text-2xl font-bold text-stone-900 dark:text-white">
                24–48 hours
              </p>
              <p className="text-stone-400 text-sm mt-1">
                WAT (UTC+1) · Port Harcourt, Nigeria
              </p>
            </div>

            <div className="glass rounded-3xl p-7">
              <p className="text-brand-500 font-semibold text-xs tracking-widest uppercase mb-3">
                Currently Available For
              </p>
              {[
                "Freelance projects",
                "Technical consulting",
                "Partnerships / collabs",
                "Speaking / mentorship",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  <span className="text-stone-600 dark:text-stone-400 text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass rounded-3xl p-8 space-y-5"
              noValidate
            >
              {/* Global error banner */}
              {globalError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl p-4"
                >
                  <AlertCircle
                    size={18}
                    className="text-red-400 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-red-400 text-sm">{globalError}</p>
                </motion.div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <input
                    {...register("name")}
                    placeholder="Your name *"
                    className={errors.name ? errorInputClass : inputClass}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email address *"
                    className={errors.email ? errorInputClass : inputClass}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  {...register("subject")}
                  placeholder="Subject *"
                  className={errors.subject ? errorInputClass : inputClass}
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <select
                  {...register("projectType")}
                  className={inputClass + " text-stone-600 dark:text-stone-400"}
                >
                  <option value="">Project type (optional)</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <input
                  {...register("budget")}
                  placeholder="Budget range (optional)"
                  className={inputClass}
                />
              </div>

              <div>
                <textarea
                  {...register("message")}
                  placeholder="Tell me about your project, goals, and timeline... *"
                  rows={5}
                  className={
                    (errors.message ? errorInputClass : inputClass) +
                    " resize-none"
                  }
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-stone-400 text-xs text-center">
                No spam. Your information is never shared.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
