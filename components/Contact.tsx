"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Mail, Send, Loader2, AlertCircle,
} from "lucide-react";

const ContactSchema = z.object({
  name: z.string().min(2, "Name required").max(100),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject required").max(200),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(20, "Please describe your project (min 20 characters)").max(5000),
});

type ContactFormData = z.infer<typeof ContactSchema>;

const projectTypes = [
  "Web Application", "Mobile App", "AI/ML Integration", "Backend / API",
  "Consulting", "Social Impact Tech", "Other",
];

export default function Contact() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  useEffect(() => {
    if (!globalError) return;
    const timer = setTimeout(() => setGlobalError(""), 6000);
    return () => clearTimeout(timer);
  }, [globalError]);

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
        } else {
          setGlobalError(json.error || "Something went wrong. Please try again.");
          toast.error("Message failed to send.");
        }
        return;
      }
      toast.success("Message sent! David will respond within 24-48 hours.");
      reset();
    } catch {
      setGlobalError("Network error. Please email David directly.");
      toast.error("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-[100px] px-5 md:px-0" style={{ background: "rgba(255,255,255,0.02)" }} ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto">
        <div className="glass-panel rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"
            style={{ background: "rgba(0, 112, 243, 0.15)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Let&apos;s Build Something <span className="text-primary">Amazing</span>.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              I am always open to discussing technical architecture, startup advisory, or high-stakes engineering roles.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            {/* Left - Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-foreground">
                  <Mail size={20} className="text-primary" />
                  <span>davidbriggd478@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-foreground">
                  <span className="text-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span>Global / Remote</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                {globalError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                  >
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{globalError}</p>
                  </motion.div>
                )}

                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-4 font-semibold">Name</label>
                  <input {...register("name")} placeholder="John Doe" className={`w-full bg-white/5 border border-border-subtle rounded-xl px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors ${errors.name ? "!border-red-500" : ""}`} />
                  {errors.name && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} /> {errors.name.message}</p>}
                </div>

                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-4 font-semibold">Email Address</label>
                  <input {...register("email")} type="email" placeholder="john@company.com" className={`w-full bg-white/5 border border-border-subtle rounded-xl px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors ${errors.email ? "!border-red-500" : ""}`} />
                  {errors.email && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} /> {errors.email.message}</p>}
                </div>

                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-4 font-semibold">Message</label>
                  <textarea {...register("message")} placeholder="Describe your project..." rows={4}
                    className={`w-full bg-white/5 border border-border-subtle rounded-xl px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors resize-none ${errors.message ? "!border-red-500" : ""}`} />
                  {errors.message && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} /> {errors.message.message}</p>}
                </div>

                <button type="submit" disabled={submitting}
                  className="w-full bg-primary text-background py-5 rounded-xl font-medium text-sm hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" />Sending...</span>
                  ) : (
                    <span className="flex items-center justify-center gap-2"><Send size={16} />Send Message</span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
