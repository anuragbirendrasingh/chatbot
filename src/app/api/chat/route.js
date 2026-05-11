import { NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import { adminDb } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const { message, sessionId, chatHistory } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Use existing session or create new one
    const session = sessionId || uuidv4();

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
      } catch (aiError) {
        console.error("Gemini error:", aiError);
        answer =
          SAMPLE_ANSWERS[message] ||
          "Gemini not responding right now. Here is a sample response for testing. You can ask about Admission Process, Fee Structure, Eligibility, Courses Offered, Scholarship, or Contact Us.";
        escalate = false;
      }
    }

    // Save conversation to Firestore
    try {
      if (adminDb && !isDevMode) {
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
      }
    } catch (dbError) {
      console.error("Firestore save error:", dbError);
    }

    // If bot can't answer — save to escalations
    if (escalate && adminDb && !isDevMode) {
      try {
        await adminDb.collection("escalations").add({
          sessionId: session,
          question: message,
          chatHistory: chatHistory || [],
          status: "pending",
          createdAt: new Date(),
        });
      } catch (dbError) {
        console.error("Escalation save error:", dbError);
      }
    }

    return NextResponse.json({ answer, escalate, sessionId: session });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      answer:
        "Gemini not responding right now. Here is a sample response for testing. Ask about Admission Process, Fee Structure, Eligibility, Courses Offered, Scholarship, or Contact Us.",
      escalate: false,
    });
  }
}