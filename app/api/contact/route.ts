import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const rlMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): { allowed: boolean; waitSecs: number } {
  const now = Date.now();
  const windowMs = 15 * 60_000; // 15 minutes
  const limit = 3; // 3 contact messages per 15 min per IP

  const entry = rlMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rlMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, waitSecs: 0 };
  }
  if (entry.count >= limit) {
    return { allowed: false, waitSecs: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { allowed: true, waitSecs: 0 };
}

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

const ContactSchema = z.object({
  name: z.string().min(2, "Name too short").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject required").max(200),
  projectType: z.string().max(50).optional(),
  budget: z.string().max(100).optional(),
  message: z
    .string()
    .min(20, "Message too short — please describe your project")
    .max(5000, "Message too long"),
});

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  const rl = rateLimit(ip);

  if (!rl.allowed) {
    const mins = Math.ceil(rl.waitSecs / 60);
    return NextResponse.json(
      {
        error: `Too many messages sent. Please wait ${mins} minute${mins !== 1 ? "s" : ""} before trying again.`,
      },
      { status: 429, headers: { "Retry-After": String(rl.waitSecs) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, subject, projectType, budget, message } = parsed.data;

  // Spam check
  const hasLinks = /https?:\/\/|www\./i.test(message);
  const spamKeywords = /casino|crypto|nft|forex|investment opportunity/i.test(message);
  if (hasLinks || spamKeywords) {
    // Return 200 silently so bots don't know they were blocked
    return NextResponse.json({ success: true });
  }

  // Send via EmailJS server-side REST API
  const emailPayload = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PRIVATE_KEY,
    template_params: {
      from_name: name,
      from_email: email,
      subject,
      project_type: projectType || "Not specified",
      budget: budget || "Not specified",
      message,
      to_email: process.env.DAVID_EMAIL,
      to_name: "David",
      reply_to: email,
    },
  };

  try {
    const emailRes = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      }
    );

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("EmailJS error:", errText);
      throw new Error("EmailJS failed");
    }
  } catch (err) {
    console.error("Contact send error:", err);
    return NextResponse.json(
      {
        error:
          "Failed to send your message. Please email david directly at the address shown on the page.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Message sent! David will respond within 24–48 hours.",
  });
}

