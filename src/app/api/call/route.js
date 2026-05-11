import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request) {
  try {
    const { phone, name } = await request.json();
    const isDevMode = process.env.DEV_MODE === "true";

    if (!phone) {
      return NextResponse.json({ error: "phone is required" }, { status: 400 });
    }

    if (isDevMode) {
      return NextResponse.json({ success: true, devMode: true });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM_NUMBER;
    const message =
      process.env.TWILIO_VOICE_MESSAGE ||
      "Hello! Thank you for your interest. Our admissions team will contact you shortly.";

    if (!accountSid || !authToken || !fromNumber) {
      return NextResponse.json(
        { error: "Twilio credentials are not configured" },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>\n<Response>\n  <Say voice="alice">Hello ${name || "there"}. ${message}</Say>\n</Response>`;

    await client.calls.create({
      to: phone,
      from: fromNumber,
      twiml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Call API error:", error);
    return NextResponse.json({ error: "Failed to place call" }, { status: 500 });
  }
}
