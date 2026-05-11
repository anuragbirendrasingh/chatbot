
export async function POST(req) {
  // console.log("[TwiML API] ===== START =====");
  // console.log("[TwiML API] Timestamp:", new Date().toISOString());
  // console.log("[TwiML API] Twilio webhook called - returning initial TwiML");
  
  try {
    // Log Twilio request headers for debugging
    const url = req.url;
    const method = req.method;
    // console.log("[TwiML API] Request:", { url, method });

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Say voice="Polly.Aditi" language="hi-IN">
      Namaste! Aapka swagat hai hamare EdTech platform mein.
      Kya aap hamare courses ke baare mein jaanna chahte hain?
    </Say>
    <Gather 
      input="speech" 
      action="/api/call/webhook" 
      language="hi-IN"
      timeout="5">
      <Say voice="Polly.Aditi" language="hi-IN">
        Haan ya na boliye
      </Say>
    </Gather>
  </Response>`;

    // console.log("[TwiML API] Returning TwiML successfully");
    // console.log("[TwiML API] ===== END =====");
    
    return new Response(twiml, {
      headers: { 'Content-Type': 'text/xml' }
    });
  } catch (error) {
    // console.log("[TwiML API] ERROR:", error?.message);
    // console.log("[TwiML API] ===== END (Error) =====");
    
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
