import twilio from 'twilio';

export async function POST(req) {
  try {
    const { userPhone } = await req.json();

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const call = await client.calls.create({
      url: `${process.env.NEXT_PUBLIC_URL}/api/twiml`,
      to: userPhone,
      from: process.env.TWILIO_FROM_NUMBER
    });

    return Response.json({ 
      success: true, 
      callSid: call.sid 
    });

  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}