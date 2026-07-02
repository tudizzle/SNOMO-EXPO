import { NextRequest, NextResponse } from "next/server";

type SponsorInquirySubmission = {
  additionalInformation?: unknown;
  companyName?: unknown;
  contactName?: unknown;
  email?: unknown;
  opportunities?: unknown;
  phone?: unknown;
  website?: unknown;
};

const recipientEmail = "tudizzle@gmail.com";

function normalizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOpportunities(value: unknown) {
  return Array.isArray(value)
    ? value.filter((opportunity): opportunity is string => typeof opportunity === "string")
        .map((opportunity) => opportunity.trim())
        .filter(Boolean)
    : [];
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as SponsorInquirySubmission;

  const companyName = normalizeField(payload.companyName);
  const contactName = normalizeField(payload.contactName);
  const email = normalizeField(payload.email);
  const phone = normalizeField(payload.phone);
  const website = normalizeField(payload.website);
  const opportunities = normalizeOpportunities(payload.opportunities);
  const additionalInformation = normalizeField(payload.additionalInformation);

  if (!companyName || !contactName || !email || opportunities.length === 0) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const emailBody = [
    "New Colorado Snomo Expo sponsorship inquiry",
    "",
    `Company Name: ${companyName}`,
    `Contact Name: ${contactName}`,
    `Email Address: ${email}`,
    `Phone Number: ${phone || "Not provided"}`,
    `Website: ${website || "Not provided"}`,
    "",
    "Sponsorship Opportunities of Interest:",
    opportunities.map((opportunity) => `- ${opportunity}`).join("\n"),
    "",
    "Additional Information:",
    additionalInformation || "Not provided",
  ].join("\n");

  // TODO: Connect production email delivery by adding RESEND_API_KEY and
  // SPONSOR_INQUIRY_FROM_EMAIL. The API route is structured for Resend so
  // submissions can be delivered to tudizzle@gmail.com once those environment
  // variables are set.
  if (process.env.RESEND_API_KEY && process.env.SPONSOR_INQUIRY_FROM_EMAIL) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.SPONSOR_INQUIRY_FROM_EMAIL,
        to: recipientEmail,
        subject: "Colorado Snomo Expo Sponsorship Inquiry",
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
