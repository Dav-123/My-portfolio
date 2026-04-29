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
  content: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Max 1000 characters"),
});

type ReviewForm = z.infer<typeof ReviewSchema>;

const seedReviews: Review[] = [
  {
    id: "seed-1",
    name: "Adaeze Okonkwo",
    role: "Product Manager",
    company: "TechHub Lagos",
    content:
      "David built our internal tool from scratch in under 3 weeks. Clean code, great communication, and shipped on time. Highly recommend.",
    rating: 5,
    created_at: new Date().toISOString(),
    approved: true,
  },
  {
    id: "seed-2",
    name: "Emeka Nwosu",
    role: "Founder",
    company: "Startup Nigeria",
    content:
      "We came with a half-baked idea. David helped shape the product, built the MVP, and suggested improvements we hadn't thought of. He's a true builder.",
    rating: 5,
    created_at: new Date().toISOString(),
    approved: true,
  },
  {
    id: "seed-3",
    name: "Chisom Eze",
    role: "Software Engineer",
    company: "Andela",
    content:
      "Reviewed David's codebase for a client project. Clean architecture, well-commented, and production-ready. You can tell this guy takes his craft seriously.",
    rating: 5,
    created_at: new Date().toISOString(),
    approved: true,
  },
];

const inputClass =
  "w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-500 transition-colors placeholder:text-stone-400";

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

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ReviewForm>({
    resolver: zodResolver(ReviewSchema),
  });

  // Watch content length for char counter
  const contentValue = watch("content", "");
  useEffect(() => {
    setCharCount(contentValue?.length || 0);
  }, [contentValue]);

  // Fetch approved reviews
  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data: Review[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch(() => {
        // Silently keep seed reviews as fallback
      });
  }, []);

  const onSubmit = async (data: ReviewForm) => {
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rating }),
      });

      const json = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setSubmitError(
            json.error || "You've submitted too many reviews recently. Please wait a few minutes."
          );
        } else if (res.status === 422 && json.fields) {
          const firstError = Object.values(json.fields)[0];
          setSubmitError(
            Array.isArray(firstError) ? firstError[0] : "Validation error."
          );
        } else {
          setSubmitError(
            json.error || "Something went wrong. Please try again."
          );
        }
        toast.error("Review not submitted.");
        return;
      }

      toast.success("🎉 Review submitted! It'll appear after approval.");
      reset();
      setRating(5);
      setSubmitError("");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
      toast.error("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="py-28 px-6 bg-stone-50/50 dark:bg-stone-950/50"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-4">
            Client Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-stone-900 dark:text-white mb-4">
            What People Say
          </h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
            Real feedback from real clients and collaborators.
          </p>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-3xl p-7 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={16}
                    className={
                      si < review.rating
                        ? "text-brand-500 fill-brand-500"
                        : "text-stone-300 dark:text-stone-700"
                    }
                  />
                ))}
              </div>

              <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm flex-1 mb-6">
                "{review.content}"
              </p>

              <div className="border-t border-stone-200 dark:border-stone-800 pt-4">
                <p className="font-semibold text-stone-900 dark:text-white text-sm">
                  {review.name}
                </p>
                <p className="text-stone-400 text-xs mt-0.5">
                  {review.role}
                  {review.company ? ` · ${review.company}` : ""}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submission form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-3xl p-10 text-center border border-emerald-500/20"
              >
                <div className="text-5xl mb-4">🙏</div>
                <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white mb-3">
                  Thank you!
                </h3>
                <p className="text-stone-500 dark:text-stone-400 mb-6">
                  Your review has been submitted and will appear here after David approves it.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-brand-500 text-sm font-semibold hover:underline"
                >
                  Submit another review
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-3xl p-8"
              >
                <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white mb-2">
                  Worked with David?
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-7">
                  Leave a review and help others know what to expect.
                </p>

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-5"
                  >
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <input
                        {...register("name")}
                        placeholder="Your name *"
                        className={errors.name ? inputClass.replace("border-stone-200 dark:border-stone-800", "border-red-500") : inputClass}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("role")}
                        placeholder="Your role / title *"
                        className={errors.role ? inputClass.replace("border-stone-200 dark:border-stone-800", "border-red-500") : inputClass}
                      />
                      {errors.role && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.role.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <input
                    {...register("company")}
                    placeholder="Company / Organization (optional)"
                    className={inputClass}
                  />

                  <div>
                    <textarea
                      {...register("content")}
                      placeholder="Your honest review *"
                      rows={4}
                      className={
                        (errors.content
                          ? inputClass.replace("border-stone-200 dark:border-stone-800", "border-red-500")
                          : inputClass) + " resize-none"
                      }
                    />
                    <div className="flex items-center justify-between mt-1">
                      {errors.content ? (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.content.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span
                        className={`text-xs ml-auto ${
                          charCount > 900
                            ? "text-red-400"
                            : charCount > 700
                            ? "text-amber-400"
                            : "text-stone-400"
                        }`}
                      >
                        {charCount}/1000
                      </span>
                    </div>
                  </div>

                  {/* Star selector */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-stone-500 font-medium">
                      Your rating:
                    </span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRating(i + 1)}
                          onMouseEnter={() => setHoveredStar(i + 1)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="transition-all hover:scale-125 focus:outline-none focus-visible:scale-125"
                          aria-label={`Rate ${i + 1} star${i !== 0 ? "s" : ""}`}
                        >
                          <Star
                            size={24}
                            className={
                              i < (hoveredStar || rating)
                                ? "text-brand-500 fill-brand-500"
                                : "text-stone-300 dark:text-stone-700"
                            }
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-stone-400 text-sm">
                      {["", "Poor", "Fair", "Good", "Great", "Excellent"][
                        hoveredStar || rating
                      ]}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Submit Review
                      </>
                    )}
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
