"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Send, Loader2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import type { Review } from "@/types";

const ReviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  role: z.string().min(2, "Role is required").max(100),
  company: z.string().max(100).optional(),
  content: z.string().min(10, "Review must be at least 10 characters").max(1000, "Max 1000 characters"),
});

type ReviewForm = z.infer<typeof ReviewSchema>;

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-primary", "bg-teal-500", "bg-blue-500", "bg-emerald-500",
    "bg-amber-500", "bg-rose-500", "bg-cyan-500", "bg-indigo-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

const seedReviews: Review[] = [
  { id: "seed-1", name: "Adaeze Okonkwo", role: "Product Manager", company: "TechHub Lagos", content: "David built our internal tool from scratch in under 3 weeks. Clean code, great communication, and shipped on time. Highly recommend.", rating: 5, created_at: new Date().toISOString(), approved: true },
  { id: "seed-2", name: "Emeka Nwosu", role: "Founder", company: "Startup Nigeria", content: "We came with a half-baked idea. David helped shape the product, built the MVP, and suggested improvements we hadn't thought of. He's a true builder.", rating: 5, created_at: new Date().toISOString(), approved: true },
  { id: "seed-3", name: "Chisom Eze", role: "Software Engineer", company: "Andela", content: "Reviewed David's codebase for a client project. Clean architecture, well-commented, and production-ready. You can tell this guy takes his craft seriously.", rating: 5, created_at: new Date().toISOString(), approved: true },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!submitError) return;
    const timer = setTimeout(() => setSubmitError(""), 6000);
    return () => clearTimeout(timer);
  }, [submitError]);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<ReviewForm>({
    resolver: zodResolver(ReviewSchema),
  });

  const contentValue = watch("content", "");
  useEffect(() => { setCharCount(contentValue?.length || 0); }, [contentValue]);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => { if (!r.ok) throw new Error("fetch failed"); return r.json(); })
      .then((data: Review[]) => { if (Array.isArray(data) && data.length > 0) setReviews(data); })
      .catch(() => {});
  }, []);

  const onSubmit = async (data: ReviewForm) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, rating }) });
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 429) { setSubmitError(json.error || "Too many reviews. Please wait."); }
        else if (res.status === 422 && json.fields) { const firstError = Object.values(json.fields)[0]; setSubmitError(Array.isArray(firstError) ? firstError[0] : "Validation error."); }
        else { setSubmitError(json.error || "Something went wrong."); }
        toast.error("Review not submitted.");
        return;
      }
      toast.success("Review submitted! It'll appear after approval.");
      reset(); setRating(5); setSubmitError(""); setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again.");
      toast.error("Network error.");
    } finally { setSubmitting(false); }
  };

  return (
    <section className="py-20 px-4 bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16 sm:mb-20">
          <p className="text-primary font-semibold text-xs sm:text-sm tracking-widest uppercase mb-4">Client Stories</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">What People Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">Real feedback from real clients and collaborators.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 sm:mb-20">
          {reviews.map((review, i) => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} className="rounded-2xl bg-card p-6 sm:p-7 flex flex-col border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 shadow-sm card-lift">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={14} className={si < review.rating ? "text-primary fill-primary" : "text-stone-300 dark:text-stone-700"} />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-6">
                &quot;{review.content}&quot;
              </p>
              <div className="border-t border-border pt-4 flex items-center gap-3">
                {/* Circular avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${getAvatarColor(review.name)}`}>
                  {getInitials(review.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{review.name}</p>
                  <p className="text-muted-foreground text-xs truncate">{review.role}{review.company ? ` · ${review.company}` : ""}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="rounded-2xl bg-card p-8 sm:p-10 text-center border border-emerald-500/20 shadow-sm">
                <div className="text-4xl sm:text-5xl mb-4">🙏</div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">Thank you!</h3>
                <p className="text-muted-foreground text-sm mb-6">Your review has been submitted and will appear after approval.</p>
                <button onClick={() => setSubmitted(false)} className="text-primary text-sm font-semibold hover:underline">Submit another review</button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl bg-card p-6 sm:p-8 border border-border shadow-sm">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">Worked with David?</h3>
                <p className="text-muted-foreground text-sm mb-7">Leave a review and help others know what to expect.</p>

                {submitError && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5">
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-2">Name <span className="text-red-400">*</span></label>
                      <input {...register("name")} placeholder="Your name" className={`premium-input ${errors.name ? "!border-red-500" : ""}`} />
                      {errors.name && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} /> {errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-2">Role <span className="text-red-400">*</span></label>
                      <input {...register("role")} placeholder="Your role / title" className={`premium-input ${errors.role ? "!border-red-500" : ""}`} />
                      {errors.role && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} /> {errors.role.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">Company</label>
                    <input {...register("company")} placeholder="Company / Organization (optional)" className="premium-input" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">Review <span className="text-red-400">*</span></label>
                    <textarea {...register("content")} placeholder="Your honest review" rows={4}
                      className={`premium-input resize-none ${errors.content ? "!border-red-500" : ""}`} />
                    <div className="flex items-center justify-between mt-1.5">
                      {errors.content ? <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={11} /> {errors.content.message}</p> : <span />}
                      <span className={`text-xs ml-auto ${charCount > 900 ? "text-red-400" : charCount > 700 ? "text-amber-400" : "text-muted-foreground"}`}>{charCount}/1000</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-muted-foreground font-medium">Your rating:</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button key={i} type="button" onClick={() => setRating(i + 1)} onMouseEnter={() => setHoveredStar(i + 1)} onMouseLeave={() => setHoveredStar(0)}
                          className="transition-all hover:scale-125 focus:outline-none focus-visible:scale-125" aria-label={`Rate ${i + 1} star${i !== 0 ? "s" : ""}`}>
                          <Star size={20} className={i < (hoveredStar || rating) ? "text-primary fill-primary" : "text-stone-300 dark:text-stone-700"} />
                        </button>
                      ))}
                    </div>
                    <span className="text-muted-foreground text-sm">{["", "Poor", "Fair", "Good", "Great", "Excellent"][hoveredStar || rating]}</span>
                  </div>

                  <button type="submit" disabled={submitting}
                    className="btn-primary w-full sm:w-auto"
                  >
                    {submitting ? (<><Loader2 size={15} className="animate-spin" />Submitting...</>) : (<><Send size={15} />Submit Review</>)}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
