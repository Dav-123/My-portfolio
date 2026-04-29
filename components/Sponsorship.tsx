"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, Shield, Globe, Send, Loader2, CheckCircle, AlertCircle, Users, TrendingUp } from "lucide-react";
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
  {
    icon: Users,
    title: "Community Recognition",
    desc: "Featured in project announcements, social media, and impact reports.",
  },
  {
    icon: TrendingUp,
    title: "Scale Together",
    desc: "First-mover advantage as VeriRide expands across Nigerian states.",
  },
];

const tiers = [
  { name: "Seed", amount: "$500 - $2,000", desc: "Early supporter recognition" },
  { name: "Growth", amount: "$2,000 - $10,000", desc: "Named sponsor + quarterly reports" },
  { name: "Impact", amount: "$10,000+", desc: "Co-branded partnership + board seat" },
];

export default function Sponsorship() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", org: "", tier: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Sponsorship interest received! David will reach out within 48 hours.");
    setForm({ name: "", email: "", org: "", tier: "", message: "" });
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClass = "w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-stone-400";

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-brand-500 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
            Make an Impact
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 dark:text-white mb-3 sm:mb-4">
            Sponsor a Project
          </h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
            VeriRide Nigeria is actively seeking sponsors -- individuals, companies, and NGOs
            who believe Nigerian lives are worth protecting. Your support directly funds
            development, pilot programs, and government engagement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left -- Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* VeriRide card */}
            <div className="glass-card p-6 sm:p-8 border-red-500/20 !border-red-500/20">
              <div className="text-5xl sm:text-6xl mb-4">🛡️</div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-2">
                VeriRide Nigeria
              </h3>
              <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6">
                A platform to eliminate &quot;one-chance&quot; vehicle crimes in Nigeria through technology.
                Every ride verified. Every passenger protected.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="flex gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-brand-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 dark:text-white text-sm">{b.title}</p>
                        <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sponsorship tiers */}
            <div className="glass-card p-6 sm:p-8">
              <h4 className="font-display text-lg font-bold text-stone-900 dark:text-white mb-4">
                Sponsorship Tiers
              </h4>
              <div className="space-y-3">
                {tiers.map((tier) => (
                  <div key={tier.name} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-stone-100/50 dark:bg-stone-900/50 border border-stone-200/50 dark:border-stone-800/50">
                    <div>
                      <p className="font-semibold text-stone-900 dark:text-white text-sm">{tier.name}</p>
                      <p className="text-stone-400 text-xs">{tier.desc}</p>
                    </div>
                    <span className="text-brand-500 font-bold text-xs sm:text-sm whitespace-nowrap">{tier.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right -- Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <div className="glass-card p-8 sm:p-10 text-center border-emerald-500/20 !border-emerald-500/20">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}>
                  <CheckCircle size={56} className="text-emerald-400 mx-auto mb-5" />
                </motion.div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-2">
                  Interest Received!
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
                  David will reach out within 48 hours to discuss sponsorship opportunities.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-brand-500 text-sm font-semibold hover:underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <div className="glass-card p-6 sm:p-8">
                <h3 className="font-display text-lg sm:text-xl font-bold text-stone-900 dark:text-white mb-2">
                  Express Sponsorship Interest
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
                  Fill in your details and David will get back to you within 48 hours.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Adebayo Okonkwo"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. adebayo@company.com"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">
                      Organization / Company
                    </label>
                    <input
                      value={form.org}
                      onChange={(e) => setForm({ ...form, org: e.target.value })}
                      placeholder="e.g. TechHub Lagos (optional)"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">
                      Sponsorship Tier
                    </label>
                    <select
                      value={form.tier}
                      onChange={(e) => setForm({ ...form, tier: e.target.value })}
                      className={inputClass + " text-stone-600 dark:text-stone-400"}
                    >
                      <option value="">Select a tier (optional)</option>
                      <option value="seed">Seed ($500 - $2,000)</option>
                      <option value="growth">Growth ($2,000 - $10,000)</option>
                      <option value="impact">Impact ($10,000+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your interest, sponsorship capacity, or any questions..."
                      rows={4}
                      className={inputClass + " resize-none"}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Express Interest
                      </>
                    )}
                  </button>
                  <p className="text-stone-400 text-xs text-center">
                    No commitment required. David responds within 48 hours.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
