import { NextRequest, NextResponse } from "next/server";

type SwapMeetSubmission = {
  email?: unknown;
  name?: unknown;
  phone?: unknown;
  plannedItems?: unknown;
};

const recipientEmail = "tudizzle@gmail.com";

function normalizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as SwapMeetSubmission;

  const name = normalizeField(payload.name);
  const email = normalizeField(payload.email);
  const phone = normalizeField(payload.phone);
  const plannedItems = normalizeField(payload.plannedItems);

  if (!name || !email || !phone || !plannedItems) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const emailBody = [
    "New Colorado Snomo Expo swap meet submission",
    "",
    `Name: ${name}`,
    `Email Address: ${email}`,
    `Phone Number: ${phone}`,
    "",
    "What are you planning to sell?",
    plannedItems,
  ].join("\n");

  // TODO: Connect production email delivery by adding RESEND_API_KEY and
  // SWAP_MEET_FROM_EMAIL. The API route is structured for Resend so submissions
  // can be delivered to tudizzle@gmail.com once those environment variables are set.
  if (process.env.RESEND_API_KEY && process.env.SWAP_MEET_FROM_EMAIL) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.SWAP_MEET_FROM_EMAIL,
        to: recipientEmail,
        subject: "Swapper",
        text: emailBody,
        reply_to: email,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Email delivery failed." }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
