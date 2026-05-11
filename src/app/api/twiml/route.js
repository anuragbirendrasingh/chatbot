
export async function POST(req) {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Say voice="Polly.Aditi" language="hi-IN">
      Namaste! Aapka swagat hai hamare EdTech platform mein.
      Kya aap hamare courses ke baare mein jaanna chahte hain?
    </Say>
    <Gather 
      input="speech" 
      action="/api/bot-response" 
      language="hi-IN"
      timeout="5">
      <Say voice="Polly.Aditi" language="hi-IN">
        Haan ya na boliye
      </Say>
    </Gather>
  </Response>`;

  return new Response(twiml, {
    headers: { 'Content-Type': 'text/xml' }
  });
}