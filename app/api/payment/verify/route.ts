import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

const VerifySchema = z.object({
  reference: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  tier: z.string().min(1),
  topic: z.string().optional(),
});

// Rate limiting store (in-memory — fine for this use case)
// For production, use Redis or Upstash
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, limit = 3, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count += 1;
  return true;
}

async function verifyWithPaystack(reference: string) {
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.json();
}

async function sendConfirmationEmail(data: {
  name: string;
  email: string;
  tier: string;
  topic: string;
  reference: string;
  amount: string;
}) {
  // EmailJS REST API — works server-side with private key
  const payload = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PRIVATE_KEY,
    template_params: {
      to_email: data.email,
      to_name: data.name,
      tier: data.tier,
      topic: data.topic || "Not specified",
      reference: data.reference,
      amount: data.amount,
      david_email: process.env.DAVID_EMAIL,
    },
  };

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.ok;
}

export async function POST(req: NextRequest) {
  // Rate limiting by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip, 5, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute." },
      { status: 429 }
    );
  }

  // Parse and validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = VerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { reference, name, email, tier, topic } = parsed.data;

  // Check if reference already processed (idempotency)
  const { data: existing } = await supabase
    .from("bookings")
    .select("id")
    .eq("reference", reference)
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "This payment reference has already been processed." },
      { status: 409 }
    );
  }

  // Verify with Paystack
  let paystackData: {
    status: boolean;
    data?: {
      status: string;
      amount: number;
      currency: string;
      customer: { email: string };
      metadata?: {
        custom_fields?: Array<{ variable_name: string; value: string }>;
      };
    };
  };

  try {
    paystackData = await verifyWithPaystack(reference);
  } catch {
    return NextResponse.json(
      { error: "Could not reach Paystack. Please try again." },
      { status: 502 }
    );
  }

  if (!paystackData.status || paystackData.data?.status !== "success") {
    return NextResponse.json(
      { error: "Payment not confirmed by Paystack. Please contact David directly." },
      { status: 402 }
    );
  }

  // Verify the email matches (security check)
  if (paystackData.data.customer.email.toLowerCase() !== email.toLowerCase()) {
    return NextResponse.json(
      { error: "Email mismatch. Payment verification failed." },
      { status: 403 }
    );
  }

  const amountNGN = `₦${(paystackData.data.amount / 100).toLocaleString()}`;

  // Store booking in Supabase
  const { error: dbError } = await supabase.from("bookings").insert([
    {
      reference,
      name,
      email,
      tier,
      topic: topic || null,
      amount_kobo: paystackData.data.amount,
      currency: paystackData.data.currency,
      status: "confirmed",
      created_at: new Date().toISOString(),
    },
  ]);

  if (dbError) {
    console.error("DB insert error:", dbError);
    // Don't fail the whole request — payment was verified, just log it
  }

  // Send confirmation email (non-blocking — don't fail if email fails)
  sendConfirmationEmail({ name, email, tier, topic: topic || "", reference, amount: amountNGN })
    .catch((err) => console.error("Email send failed:", err));

  // Also notify David
  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        to_email: process.env.DAVID_EMAIL,
        to_name: "David",
        subject: `New consultation booking — ${tier}`,
        message: `${name} (${email}) booked a ${tier} consultation.\n\nTopic: ${topic || "Not specified"}\nAmount: ${amountNGN}\nRef: ${reference}`,
      },
    }),
  }).catch(console.error);

  return NextResponse.json({
    success: true,
    message: "Payment verified and booking confirmed.",
    booking: { reference, tier, amount: amountNGN },
  });
}
