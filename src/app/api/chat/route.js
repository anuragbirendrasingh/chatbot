import { NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import { adminDb } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  const startTime = Date.now();
  console.log("[Chat API] ===== START =====");
  console.log("[Chat API] Timestamp:", new Date().toISOString());
  
  try {
    const { message, sessionId, chatHistory, phone } = await request.json();
    console.log("[Chat API] Request payload:", { 
      message, 
      sessionId, 
      phone: phone || "not provided",
      chatHistoryLength: chatHistory?.length || 0,
    });

    if (!message) {
      console.log("[Chat API] ERROR: Message is required");
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Use existing session or create new one
    const session = sessionId || uuidv4();
    console.log("[Chat API] Session ID:", session);

    // Mock answers for testing/dev when AI is unavailable
    const SAMPLE_ANSWERS = {
      "Admission Process":
        "Admission Process:\n1) Apply online and create your profile.\n2) Upload documents (10th/12th marksheets, ID proof).\n3) Pay the registration fee (INR 500).\n4) Attend counselling (online or campus).\n5) Receive the admission offer.\n6) Pay first-semester fee to confirm your seat.",
      "Fee Structure":
        "Fee Structure (Sample):\n- Registration: INR 500 (non-refundable)\n- Tuition: INR 1,20,000 per year (BBA) / INR 1,50,000 per year (B.Tech)\n- Hostel: INR 80,000 per year (optional)\n- EMI: Available through partner banks\n- Refund: 100% before classes start",
      Eligibility:
        "Eligibility (Sample):\n- BBA: 12th pass, minimum 50%\n- B.Tech CSE: 12th PCM, minimum 60% + entrance test preferred\n- Scholarships: merit-based up to 50%",
      "Courses Offered":
        "Courses Offered (Sample):\n- BBA (3 years)\n- B.Tech CSE (4 years)\n- B.Com (3 years)\n- BA (3 years)\nAsk for a course to get full details.",
      Scholarship:
        "Scholarships (Sample):\n- Merit-based: 10% to 50%\n- Sports quota: up to 25%\n- Early application bonus: INR 5,000",
      "Contact Us":
        "Contact Us (Sample):\n- Phone: +91-90000-00000\n- Email: admissions@example.com\n- Office hours: Mon-Sat, 9 AM to 6 PM",
    };

    let answer = "";
    let escalate = false;

    const isDevMode = process.env.DEV_MODE === "true";
    const nodeEnv = process.env.NODE_ENV;
    console.log("[Chat API] Environment:", { isDevMode, nodeEnv });

    if (isDevMode) {
      answer =
        SAMPLE_ANSWERS[message] ||
        "Dev mode is enabled. Here is a sample response. Ask about Admission Process, Fee Structure, Eligibility, Courses Offered, Scholarship, or Contact Us.";
      escalate = false;
    } else {
      try {
        const result = await askGemini(message, chatHistory || []);
        answer = result.answer;
        escalate = result.escalate;
        console.log("[Chat API] AI response:", { escalate, answerLength: answer.length });
      } catch (aiError) {
        console.log("[Chat API] Gemini error:", aiError?.message);
        answer =
          SAMPLE_ANSWERS[message] ||
          "Gemini not responding right now. Here is a sample response for testing. You can ask about Admission Process, Fee Structure, Eligibility, Courses Offered, Scholarship, or Contact Us.";
        escalate = false;
      }
    }

    // Save conversation to Firestore
    try {
      if (adminDb && !isDevMode) {
        console.log("[Chat API] Saving conversation to Firestore");
        const conversationRef = adminDb.collection("conversations").doc(session);
        await conversationRef.set(
          {
            sessionId: session,
            updatedAt: new Date(),
            messages: [
              // Firestore arrayUnion equivalent — we use set with merge
              ...(chatHistory || []),
              { role: "user", content: message, timestamp: new Date() },
              { role: "bot", content: answer, timestamp: new Date() },
            ],
          },
          { merge: true }
        );
        console.log("[Chat API] Conversation saved successfully");
      }
    } catch (dbError) {
      console.log("[Chat API] Firestore save error:", dbError?.message);
    }

    // If AI escalates — save to escalations (for tracking purposes)
    if (escalate && adminDb && !isDevMode) {
      try {
        console.log("[Chat API] AI escalation triggered, saving to Firestore");
        const escalationData = {
          sessionId: session,
          question: message,
          chatHistory: chatHistory || [],
          status: "pending",
          createdAt: new Date(),
        };

        // Add phone number if provided
        if (phone) {
          escalationData.phone = phone;
          console.log("[Chat API] Phone number included in escalation:", phone);
        }

        const escalationRef = await adminDb.collection("escalations").add(escalationData);
        console.log("[Chat API] Escalation saved with ID:", escalationRef.id);
      } catch (dbError) {
        console.log("[Chat API] Escalation save error:", dbError?.message);
      }
    }

    // Trigger Twilio call if phone number is provided (independent of AI escalation)
    if (phone && adminDb && !isDevMode) {
      try {
        console.log("[Chat API] Phone number provided, triggering Twilio call to:", phone);
        
        // Save phone to leads collection with timestamp
        const leadRef = await adminDb.collection("leads").add({
          phone,
          sessionId: session,
          lastMessage: message,
          createdAt: new Date(),
        });
        console.log("[Chat API] Phone saved to leads collection with ID:", leadRef.id);

        // Ensure phone is in E.164 format
        let formattedPhone = phone.trim();
        if (!formattedPhone.startsWith("+")) {
          formattedPhone = "+91" + formattedPhone;
        }

        const callRes = await fetch(`${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_URL || ''}/api/call`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formattedPhone, name: "User" }),
        });
        const callData = await callRes.json();
        console.log("[Chat API] Call response:", { 
          ok: callRes.ok, 
          devMode: callData.devMode, 
          callSid: callData.callSid,
          error: callData.error,
        });
      } catch (callError) {
        console.log("[Chat API] Call trigger error:", callError?.message);
      }
    } else if (!phone) {
      console.log("[Chat API] No phone number provided, skipping call trigger");
    }

    const duration = Date.now() - startTime;
    console.log("[Chat API] Response sent:", `${duration}ms`);
    console.log("[Chat API] ===== END =====");
    
    return NextResponse.json({ answer, escalate, sessionId: session });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.log("[Chat API] ERROR after", `${duration}ms`);
    console.log("[Chat API] Error details:", {
      message: error?.message,
      stack: error?.stack?.substring(0, 500),
    });
    console.log("[Chat API] ===== END (Error) =====");
    
    return NextResponse.json({
      answer:
        "Gemini not responding right now. Here is a sample response for testing. Ask about Admission Process, Fee Structure, Eligibility, Courses Offered, Scholarship, or Contact Us.",
      escalate: false,
    });
  }
}