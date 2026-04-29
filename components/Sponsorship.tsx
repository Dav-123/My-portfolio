"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, Shield, Globe, Send } from "lucide-react";
import toast from "react-hot-toast";

const benefits = [
  {
    icon: Shield,
    title: "Named Sponsor",
    desc: "Your name/logo featured prominently on the app and all press materials.",
  },
  {
    icon: Globe,
    title: "Social Impact Credit",
    desc: "Co-branded association with a life-saving Nigerian tech project.",
  },
  {
    icon: Heart,
    title: "Quarterly Updates",
    desc: "Direct access to development updates, pilot results, and impact data.",
  },
];

export default function Sponsorship() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // In production, wire this up to your contact API or EmailJS
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("🙏 Sponsorship interest received! David will reach out within 48 hours.");
    setForm({ name: "", email: "", org: "", message: "" });
    setSubmitting(false);
  };

  return (
    <section className="py-28 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-4">
            Make an Impact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-stone-900 dark:text-white mb-4">
            Sponsor a Project
          </h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
            VeriRide Nigeria is actively seeking sponsors — individuals, companies, and NGOs 
            who believe Nigerian lives are worth protecting. Your support directly funds 
            development, pilot programs, and government engagement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-3xl p-8 mb-6 border border-red-500/20">
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white mb-2">
                VeriRide Nigeria
              </h3>
              <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6">
                A platform to eliminate "one-chance" vehicle crimes in Nigeria through technology. 
                Every ride verified. Every passenger protected.
              </p>
              <div className="space-y-4">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-brand-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 dark:text-white text-sm">{b.title}</p>
                        <p className="text-stone-500 dark:text-stone-400 text-sm">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white mb-6">
                Express Sponsorship Interest
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name *"
                  required
                  className="w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-500 transition-colors"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email address *"
                  required
                  className="w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-500 transition-colors"
                />
                <input
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                  placeholder="Organization / Company (optional)"
                  className="w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-500 transition-colors"
                />
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your interest and sponsorship capacity..."
                  rows={4}
                  className="w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-500 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white py-4 rounded-full font-bold transition-all hover:scale-105"
                >
                  <Send size={16} />
                  {submitting ? "Sending..." : "Express Interest"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
