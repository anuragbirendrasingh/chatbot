import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request) {
  const startTime = Date.now();
  console.log("[Call API] ===== START =====");
  console.log("[Call API] Timestamp:", new Date().toISOString());
  
  try {
    const { phone, name } = await request.json();
    console.log("[Call API] Request payload:", { phone, name });

    if (!phone) {
      console.log("[Call API] ERROR: Phone number missing");
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Validate E.164 format: must start with + followed by 7-15 digits
    const e164Regex = /^\+[1-9]\d{6,14}$/;
    if (!e164Regex.test(phone)) {
      console.log("[Call API] ERROR: Invalid phone format:", phone);
      return NextResponse.json(
        { error: `Phone number must be in E.164 format (e.g. +91XXXXXXXXXX). Got: ${phone}` },
        { status: 400 }
      );
    }

    console.log("[Call API] Proceeding with Twilio call");

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM_NUMBER;

    console.log("[Call API] Twilio credentials check:", {
      hasSid: !!accountSid,
      hasToken: !!authToken,
      hasFrom: !!fromNumber,
      sidPrefix: accountSid ? accountSid.substring(0, 8) + "..." : "none",
      fromNumber: fromNumber || "none",
    });

    if (!accountSid || !authToken || !fromNumber) {
      console.log("[Call API] ERROR: Missing Twilio credentials");
      return NextResponse.json(
        { error: "Twilio credentials are not configured on the server" },
        { status: 500 }
      );
    }

    // Build the TwiML webhook URL (must be publicly reachable HTTPS)
    const vercelUrl = process.env.VERCEL_URL;
    const publicUrl = process.env.NEXT_PUBLIC_URL;
    const domain = vercelUrl || publicUrl;
    
    console.log("[Call API] Domain configuration:", {
      vercelUrl: vercelUrl || "not set",
      publicUrl: publicUrl || "not set",
      selectedDomain: domain || "none",
    });

    if (!domain) {
      console.log("[Call API] ERROR: No production domain configured");
      return NextResponse.json(
        { error: "Production domain not configured. Set VERCEL_URL or NEXT_PUBLIC_URL." },
        { status: 500 }
      );
    }

    // Strip any trailing slash or protocol from domain
    const cleanDomain = domain.replace(/\/+$/, "").replace(/^https?:\/\//, "");
    const twilioUrl = `https://${cleanDomain}/api/bot-response`;

    console.log("[Call API] Twilio webhook URL:", twilioUrl);
    console.log("[Call API] Placing call to:", phone, "from:", fromNumber);

    const client = twilio(accountSid, authToken);
    const call = await client.calls.create({
      to: phone,
      from: fromNumber,
      url: twilioUrl,
      method: "POST",
    });

    const duration = Date.now() - startTime;
    console.log("[Call API] Call placed successfully:", {
      callSid: call.sid,
      status: call.status,
      duration: `${duration}ms`,
    });
    console.log("[Call API] ===== END (Success) =====");
    
    return NextResponse.json({ success: true, callSid: call.sid });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.log("[Call API] ERROR: Call failed after", `${duration}ms`);
    console.log("[Call API] Error details:", {
      code: error?.code,
      message: error?.message,
      moreInfo: error?.moreInfo,
      status: error?.status,
      stack: error?.stack?.substring(0, 500),
    });
    console.log("[Call API] ===== END (Error) =====");
    
    return NextResponse.json(
      { error: error?.message || "Failed to place call", twilioCode: error?.code },
      { status: 500 }
    );
  }
}
