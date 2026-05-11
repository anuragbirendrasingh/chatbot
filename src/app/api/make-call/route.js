import twilio from 'twilio';

export async function POST(req) {
  const startTime = Date.now();
  console.log("[Make-Call API] ===== START =====");
  console.log("[Make-Call API] Timestamp:", new Date().toISOString());
  
  try {
    const { userPhone } = await req.json();
    console.log("[Make-Call API] Request payload:", { userPhone });

    if (!userPhone) {
      console.log("[Make-Call API] ERROR: Phone number missing");
      return Response.json({ success: false, error: "Phone number is required" }, { status: 400 });
    }

    // Validate E.164 format
    const e164Regex = /^\+[1-9]\d{6,14}$/;
    if (!e164Regex.test(userPhone)) {
      console.log("[Make-Call API] ERROR: Invalid phone format:", userPhone);
      return Response.json(
        { success: false, error: `Phone must be E.164 format (e.g. +91XXXXXXXXXX). Got: ${userPhone}` },
        { status: 400 }
      );
    }

    console.log("[Make-Call API] Proceeding with Twilio call");

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM_NUMBER;

    console.log("[Make-Call API] Twilio credentials check:", {
      hasSid: !!accountSid,
      hasToken: !!authToken,
      hasFrom: !!fromNumber,
      sidPrefix: accountSid ? accountSid.substring(0, 8) + "..." : "none",
      fromNumber: fromNumber || "none",
    });

    if (!accountSid || !authToken || !fromNumber) {
      console.log("[Make-Call API] ERROR: Missing Twilio credentials");
      return Response.json({ success: false, error: "Twilio credentials not configured" }, { status: 500 });
    }

    const vercelUrl = process.env.VERCEL_URL;
    const publicUrl = process.env.NEXT_PUBLIC_URL;
    const domain = vercelUrl || publicUrl;
    
    console.log("[Make-Call API] Domain configuration:", {
      vercelUrl: vercelUrl || "not set",
      publicUrl: publicUrl || "not set",
      selectedDomain: domain || "none",
    });

    if (!domain) {
      console.log("[Make-Call API] ERROR: No production domain configured");
      return Response.json({ success: false, error: "Production domain not configured" }, { status: 500 });
    }

    const cleanDomain = domain.replace(/\/+$/, "").replace(/^https?:\/\//, "");
    const twilioUrl = `https://${cleanDomain}/api/twiml`;

    console.log("[Make-Call API] Twilio webhook URL:", twilioUrl);
    console.log("[Make-Call API] Placing call to:", userPhone, "from:", fromNumber);

    const client = twilio(accountSid, authToken);
    const call = await client.calls.create({
      url: twilioUrl,
      to: userPhone,
      from: fromNumber
    });

    const duration = Date.now() - startTime;
    console.log("[Make-Call API] Call placed successfully:", {
      callSid: call.sid,
      status: call.status,
      duration: `${duration}ms`,
    });
    console.log("[Make-Call API] ===== END (Success) =====");
    
    return Response.json({ success: true, callSid: call.sid });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.log("[Make-Call API] ERROR: Call failed after", `${duration}ms`);
    console.log("[Make-Call API] Error details:", {
      code: error?.code,
      message: error?.message,
      moreInfo: error?.moreInfo,
      status: error?.status,
      stack: error?.stack?.substring(0, 500),
    });
    console.log("[Make-Call API] ===== END (Error) =====");
    
    return Response.json(
      { success: false, error: error?.message || "Failed to place call", twilioCode: error?.code },
      { status: 500 }
    );
  }
}