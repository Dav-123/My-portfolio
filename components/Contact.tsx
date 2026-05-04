"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Mail, Github, Linkedin, Instagram, Facebook, Send, Loader2, AlertCircle,
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
    <section className="py-20 px-4 bg-secondary/30" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-primary font-semibold text-xs sm:text-sm tracking-widest uppercase mb-4">
            Start a Conversation
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Hire Me / Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Have a project in mind? Want to collaborate? David typically responds within 24-48 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="bg-card rounded-2xl p-6 sm:p-7 border border-border shadow-sm">
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-5">
                Connect With David
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:davidbriggd478@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <span className="text-sm break-all">davidbriggd478@gmail.com</span>
                </a>
                {[
                  { icon: Github, label: "GitHub", href: "https://github.com/dav-123", sub: "github.com/dav-123" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/david-briggs-bb5b4a379", sub: "linkedin.com/in/davidbriggs" },
                  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/davidbriggs001?igsh=MXN1cG13ZGY4dDc0ZA==", sub: "@davidbriggs001" },
                  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=100089440026395", sub: "facebook.com/DavidBriggs" },
                ].map(({ icon: Icon, label, href, sub }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground truncate">{sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 sm:p-7 border border-border shadow-sm">
              <p className="text-primary font-semibold text-xs tracking-widest uppercase mb-2">
                Typical Response
              </p>
              <p className="font-display text-xl sm:text-2xl font-bold text-foreground">
                24-48 hours
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                WAT (UTC+1) · Port Harcourt, Nigeria
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 sm:p-7 border border-border shadow-sm">
              <p className="text-primary font-semibold text-xs tracking-widest uppercase mb-3">
                Currently Available For
              </p>
              {["Freelance projects", "Technical consulting", "Partnerships / collabs", "Speaking / mentorship"].map((item) => (
                <div key={item} className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-card p-6 sm:p-8 space-y-5 border border-border shadow-sm" noValidate>
              {globalError && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                >
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{globalError}</p>
                </motion.div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Name <span className="text-red-400">*</span></label>
                  <input {...register("name")} placeholder="Your name" className={`premium-input ${errors.name ? "!border-red-500" : ""}`} />
                  {errors.name && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} /> {errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Email <span className="text-red-400">*</span></label>
                  <input {...register("email")} type="email" placeholder="Email address" className={`premium-input ${errors.email ? "!border-red-500" : ""}`} />
                  {errors.email && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} /> {errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Subject <span className="text-red-400">*</span></label>
                <input {...register("subject")} placeholder="What's this about?" className={`premium-input ${errors.subject ? "!border-red-500" : ""}`} />
                {errors.subject && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} /> {errors.subject.message}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Project type</label>
                  <select {...register("projectType")} className="premium-input text-muted-foreground">
                    <option value="">Select type (optional)</option>
                    {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Budget range</label>
                  <input {...register("budget")} placeholder="e.g. ₦200k-500k (optional)" className="premium-input" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Message <span className="text-red-400">*</span></label>
                <textarea {...register("message")} placeholder="Tell me about your project, goals, and timeline..." rows={5}
                  className={`premium-input resize-none ${errors.message ? "!border-red-500" : ""}`} />
                {errors.message && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} /> {errors.message.message}</p>}
              </div>

              <button type="submit" disabled={submitting}
                className="btn-primary w-full"
              >
                {submitting ? (<><Loader2 size={16} className="animate-spin" />Sending...</>) : (<><Send size={16} />Send Message</>)}
              </button>
              <p className="text-muted-foreground text-xs text-center">No spam. Your information is never shared.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
