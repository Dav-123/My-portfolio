import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

// In-memory rate limit store
// Key: IP address, Value: { count, resetAt }
const rlMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(
  ip: string,
  opts: { limit: number; windowMs: number }
): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const entry = rlMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rlMap.set(ip, { count: 1, resetAt: now + opts.windowMs });
    return { allowed: true, remaining: opts.limit - 1, resetInMs: opts.windowMs };
  }

  if (entry.count >= opts.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInMs: entry.resetAt - now,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: opts.limit - entry.count,
    resetInMs: entry.resetAt - now,
  };
}

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

const ReviewSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  role: z.string().min(2, "Role is required").max(100, "Role too long"),
  company: z.string().max(100, "Company name too long").optional(),
  content: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review too long (max 1000 characters)"),
  rating: z.number().int().min(1, "Rating min 1").max(5, "Rating max 5"),
});

export async function GET(req: NextRequest) {
  const ip = getIP(req);
  const rl = rateLimit(ip, { limit: 30, windowMs: 60_000 });

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rl.resetInMs / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, role, company, content, rating, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json(
      { error: "Could not load reviews." },
      { status: 500 }
    );
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      "X-RateLimit-Remaining": String(rl.remaining),
    },
  });
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);

  // Stricter limit for writes: 3 reviews per 10 minutes per IP
  const rl = rateLimit(ip, { limit: 3, windowMs: 10 * 60_000 });

  if (!rl.allowed) {
    const waitSecs = Math.ceil(rl.resetInMs / 1000);
    const waitMins = Math.ceil(waitSecs / 60);
    return NextResponse.json(
      {
        error: `You've submitted too many reviews. Please wait ${waitMins} minute${waitMins !== 1 ? "s" : ""}.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(waitSecs) },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = ReviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  // Basic spam check — reject suspiciously short or link-containing reviews
  const content = parsed.data.content;
  const hasLinks = /https?:\/\/|www\./i.test(content);
  if (hasLinks) {
    return NextResponse.json(
      { error: "Reviews cannot contain links." },
      { status: 422 }
    );
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        name: parsed.data.name.trim(),
        role: parsed.data.role.trim(),
        company: parsed.data.company?.trim() || null,
        content: parsed.data.content.trim(),
        rating: parsed.data.rating,
        approved: false, // requires manual approval in Supabase
      },
    ])
    .select("id")
    .single();

  if (error) {
    console.error("Review insert error:", error);
    return NextResponse.json(
      { error: "Could not save your review. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      id: data.id,
      message:
        "Thank you! Your review has been submitted and will appear after approval.",
    },
    { status: 201 }
  );
}
