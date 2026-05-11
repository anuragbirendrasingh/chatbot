import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request) {
  try {
    const { phone, name } = await request.json();
    const isDevMode = process.env.DEV_MODE === "true";

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Validate E.164 format: must start with + followed by 7-15 digits
    const e164Regex = /^\+[1-9]\d{6,14}$/;
    if (!e164Regex.test(phone)) {
      return NextResponse.json(
        { error: `Phone number must be in E.164 format (e.g. +91XXXXXXXXXX). Got: ${phone}` },
        { status: 400 }
      );
    }

    // Skip actual call in dev mode or when running locally (Twilio can't reach localhost)
    const isLocal = process.env.NODE_ENV !== "production";
    if (isDevMode || isLocal) {
      console.log("[Call API] Dev/local mode — skipping actual call to", phone);
      return NextResponse.json({ success: true, devMode: true });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      console.error("[Call API] Missing Twilio credentials:", {
        hasSid: !!accountSid,
        hasToken: !!authToken,
        hasFrom: !!fromNumber,
      });
      return NextResponse.json(
        { error: "Twilio credentials are not configured on the server" },
        { status: 500 }
      );
    }

    // Build the TwiML webhook URL (must be publicly reachable HTTPS)
    const domain = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_URL;
    if (!domain) {
      console.error("[Call API] No production domain configured (VERCEL_URL or NEXT_PUBLIC_URL)");
      return NextResponse.json(
        { error: "Production domain not configured. Set VERCEL_URL or NEXT_PUBLIC_URL." },
        { status: 500 }
      );
    }

    // Strip any trailing slash or protocol from domain
    const cleanDomain = domain.replace(/\/+$/, "").replace(/^https?:\/\//, "");
    const twilioUrl = `https://${cleanDomain}/api/bot-response`;

    console.log("[Call API] Placing call:", { to: phone, from: fromNumber, webhook: twilioUrl });

    const client = twilio(accountSid, authToken);
    const call = await client.calls.create({
      to: phone,
      from: fromNumber,
      url: twilioUrl,
      method: "POST",
    });

    console.log("[Call API] Call placed successfully:", call.sid);
    return NextResponse.json({ success: true, callSid: call.sid });
  } catch (error) {
    console.error("[Call API] Error:", error?.code, error?.message, error?.moreInfo);
    return NextResponse.json(
      { error: error?.message || "Failed to place call", twilioCode: error?.code },
      { status: 500 }
    );
  }
}
