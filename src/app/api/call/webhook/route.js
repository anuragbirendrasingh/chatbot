
export async function POST(req) {
  // console.log("[Call Webhook API] ===== START =====");
  // console.log("[Call Webhook API] Timestamp:", new Date().toISOString());

  try {
    const body = await req.formData();
    const speechResult = body.get("SpeechResult") || "";
    const digits = body.get("Digits") || "";
    const callSid = body.get("CallSid") || "";
    const from = body.get("From") || "";

    // console.log("[Call Webhook API] Twilio parameters:", {
    //   callSid, from,
    //   speechResult: speechResult || "none",
    //   digits: digits || "none",
    // });

    const AGENT_NUMBER = process.env.AGENT_PHONE_NUMBER || "+91XXXXXXXXXX";

    // ✅ CASE 1: Student ne bola
    if (speechResult) {
      const s = speechResult.toLowerCase();
      const interested =
        s.includes("haan") || s.includes("yes") || s.includes("ha") ||
        s.includes("okay") || s.includes("ok") || s.includes("theek") ||
        s.includes("sure") || s.includes("bilkul") || s.includes("ji");

      if (interested) {
        const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="hi-IN">
    Bilkul! Main aapko abhi apne counsellor se connect karti hoon. Please hold karein.
  </Say>
  <Play loop="3">https://com.twilio.sounds.music.s3.amazonaws.com/MARKOVICHAMP-Borghestral.mp3</Play>
  <Dial timeout="30" callerId="${AGENT_NUMBER}">
    <Number>${AGENT_NUMBER}</Number>
  </Dial>
  <Say voice="Polly.Aditi" language="hi-IN">
    Maafi chahti hoon, abhi counsellor available nahi hain. Hum aapko jald callback karenge. Dhanyawad!
  </Say>
  <Hangup/>
</Response>`;
        return new Response(twiml, { headers: { "Content-Type": "text/xml" } });

      } else {
        const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="hi-IN">
    Koi baat nahi. Agar kabhi Edukyu ke courses ke baare mein jaanna ho, toh hum hamesha yahan hain. Dhanyawad!
  </Say>
  <Hangup/>
</Response>`;
        return new Response(twiml, { headers: { "Content-Type": "text/xml" } });
      }
    }

    // ✅ CASE 2: Keypad input
    if (digits) {
      if (digits === "1") {
        const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="hi-IN">
    Bilkul! Main aapko apne counsellor se connect karti hoon. Please hold karein.
  </Say>
  <Play loop="3">https://com.twilio.sounds.music.s3.amazonaws.com/MARKOVICHAMP-Borghestral.mp3</Play>
  <Dial timeout="30">
    <Number>${AGENT_NUMBER}</Number>
  </Dial>
  <Say voice="Polly.Aditi" language="hi-IN">
    Maafi chahti hoon, abhi counsellor available nahi hain. Hum aapko jald callback karenge. Dhanyawad!
  </Say>
  <Hangup/>
</Response>`;
        return new Response(twiml, { headers: { "Content-Type": "text/xml" } });

      } else {
        const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="hi-IN">
    Theek hai. Dhanyawad aapka. Have a great day!
  </Say>
  <Hangup/>
</Response>`;
        return new Response(twiml, { headers: { "Content-Type": "text/xml" } });
      }
    }

    // ✅ CASE 3: Pehli call — greeting
    // ⬇️ timeout="10" diya taaki student ke paas reply karne ka time ho
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="hi-IN">
    Namaste! Main Edukyu ki taraf se bol rahi hoon.
    Aapne hamare platform par interest dikhaya, bahut shukriya!
    Kya aap hamare counsellor se baat karna chahenge?
  </Say>
  <Gather input="speech dtmf" timeout="10" numDigits="1" action="/api/call/webhook" method="POST" language="hi-IN" speechTimeout="auto">
    <Say voice="Polly.Aditi" language="hi-IN">
      Haan kehne ke liye 1 dabayen, ya sirf Haan bolein. Nahi ke liye 2 dabayen.
    </Say>
  </Gather>
  <Say voice="Polly.Aditi" language="hi-IN">
    Hum aapko jald callback karenge. Dhanyawad!
  </Say>
  <Hangup/>
</Response>`;

    // console.log("[Call Webhook API] ===== END =====");
    return new Response(twiml, { headers: { "Content-Type": "text/xml" } });

  } catch (error) {
    // console.log("[Call Webhook API] ERROR:", error?.message);

    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="hi-IN">
    Khed hai, kuch technical samasya aa gayi. Hum jald aapse sampark karenge. Dhanyawad!
  </Say>
  <Hangup/>
</Response>`;

    return new Response(errorTwiml, { headers: { "Content-Type": "text/xml" } });
  }
}
