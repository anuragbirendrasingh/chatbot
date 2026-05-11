export async function POST(req) {
  console.log("[Bot-Response API] ===== START =====");
  console.log("[Bot-Response API] Timestamp:", new Date().toISOString());
  console.log("[Bot-Response API] Twilio webhook called - processing user response");
  
  try {
    // Twilio sends URL-encoded form data
    const body = await req.formData();
    const speechResult = body.get('SpeechResult') || '';
    const digits = body.get('Digits') || '';
    const callSid = body.get('CallSid') || '';
    const from = body.get('From') || '';
    
    console.log("[Bot-Response API] Twilio parameters:", {
      callSid,
      from,
      speechResult: speechResult || "none",
      digits: digits || "none",
    });

    let reply = '';
    
    // Handle both voice recognition and DTMF (keypad) responses
    if (speechResult) {
      if (speechResult.toLowerCase().includes('haan') || 
      speechResult.toLowerCase().includes('yes')) {
        reply = `Bahut achha! Humara counsellor aapko jald hi call karega. Dhanyawad!`;
      } else {
        reply = `Koi baat nahi. Agar kabhi zaroorat ho toh hum yahan hain. Dhanyawad!`;
      }
    } else if (digits) {
      reply = 'Dhanyawad! Humara team aapke saath bahut jald sambandh banega.';
    } else {
      reply = 'Hello! Thank you for calling. Agar aap admissions ke baare mein puchna chahte ho toh 1 dabayen.';
    }

    console.log("[Bot-Response API] Generated reply:", reply);

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say voice="Polly.Aditi" language="hi-IN">
        ${reply}
      </Say>
      <Hangup/>
    </Response>`;

    console.log("[Bot-Response API] Returning TwiML successfully");
    console.log("[Bot-Response API] ===== END =====");
    
    return new Response(twiml, {
      headers: { 'Content-Type': 'text/xml' }
    });
  } catch (error) {
    console.log("[Bot-Response API] ERROR:", error?.message);
    console.log("[Bot-Response API] Error details:", {
      message: error?.message,
      stack: error?.stack?.substring(0, 500),
    });
    console.log("[Bot-Response API] ===== END (Error) =====");
    
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say>An error occurred. Goodbye.</Say>
      <Hangup/>
    </Response>`;
    
    return new Response(errorTwiml, {
      headers: { 'Content-Type': 'text/xml' }
    });
  }
}