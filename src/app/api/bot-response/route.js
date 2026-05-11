export async function POST(req) {
  try {
    // Twilio sends URL-encoded form data
    const body = await req.formData();
    const speechResult = body.get('SpeechResult') || '';
    const digits = body.get('Digits') || '';

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

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say voice="Polly.Aditi" language="hi-IN">
        ${reply}
      </Say>
      <Hangup/>
    </Response>`;

    return new Response(twiml, {
      headers: { 'Content-Type': 'text/xml' }
    });
  } catch (error) {
    console.error('Bot response error:', error);
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