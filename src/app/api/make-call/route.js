import twilio from 'twilio';

export async function POST(req) {
  try {
    const { userPhone } = await req.json();

    if (!userPhone) {
      return Response.json({ success: false, error: "Phone number is required" }, { status: 400 });
    }

    // Validate E.164 format
    const e164Regex = /^\+[1-9]\d{6,14}$/;
    if (!e164Regex.test(userPhone)) {
      return Response.json(
        { success: false, error: `Phone must be E.164 format (e.g. +91XXXXXXXXXX). Got: ${userPhone}` },
        { status: 400 }
      );
    }

    const isDevMode = process.env.DEV_MODE === "true";
    const isLocal = process.env.NODE_ENV !== "production";
    if (isDevMode || isLocal) {
      console.log("[Make-Call API] Dev/local mode — skipping call to", userPhone);
      return Response.json({ success: true, devMode: true });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      console.error("[Make-Call API] Missing Twilio credentials");
      return Response.json({ success: false, error: "Twilio credentials not configured" }, { status: 500 });
    }

    const domain = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_URL;
    if (!domain) {
      console.error("[Make-Call API] No production domain configured");
      return Response.json({ success: false, error: "Production domain not configured" }, { status: 500 });
    }

    const cleanDomain = domain.replace(/\/+$/, "").replace(/^https?:\/\//, "");
    const twilioUrl = `https://${cleanDomain}/api/twiml`;

    console.log("[Make-Call API] Placing call:", { to: userPhone, from: fromNumber, webhook: twilioUrl });

    const client = twilio(accountSid, authToken);
    const call = await client.calls.create({
      url: twilioUrl,
      to: userPhone,
      from: fromNumber
    });

    console.log("[Make-Call API] Call placed:", call.sid);
    return Response.json({ success: true, callSid: call.sid });

  } catch (error) {
    console.error("[Make-Call API] Error:", error?.code, error?.message);
    return Response.json(
      { success: false, error: error?.message || "Failed to place call", twilioCode: error?.code },
      { status: 500 }
    );
  }
}