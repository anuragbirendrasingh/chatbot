import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// Save lead (phone captured in chat) AND trigger Twilio call
export async function POST(request) {
  const startTime = Date.now();
  console.log("[Escalate API] ===== START =====");
  console.log("[Escalate API] Timestamp:", new Date().toISOString());
  
  try {
    const {  phone,  sessionId } = await request.json();
    console.log("[Escalate API] Request payload:", {     
      phone,      
      sessionId,
      hasPhone: !!phone,
    });

    console.log("[Escalate API] Firebase Admin status:", { adminDbInitialized: !!adminDb });

    if (adminDb) {
      console.log("[Escalate API] Saving lead to Firestore");
      try {
        const docRef = await adminDb.collection("leads").add({
          // name: name || "",
          phone,
          // email: email || "",
          // courseInterest: courseInterest || "Not specified",
          sessionId,
          status: "new",
          createdAt: new Date(),
        });
        console.log("[Escalate API] Lead saved successfully to Firestore:", docRef.id);
      } catch (firestoreError) {
        console.log("[Escalate API] ERROR: Firestore save failed:", firestoreError?.message);
        console.log("[Escalate API] Firestore error details:", {
          code: firestoreError?.code,
          message: firestoreError?.message,
          stack: firestoreError?.stack?.substring(0, 300),
        });
      }
    } else {
      console.log("[Escalate API] WARNING: Firebase Admin not configured, skipping lead storage");
      console.log("[Escalate API] Check environment variables for Firebase Admin credentials");
    }

    // Trigger Twilio call immediately when lead is submitted
    if (phone) {
      console.log("[Escalate API] Phone provided, triggering Twilio call immediately to:", phone);
      try {
        // Ensure phone is in E.164 format
        let formattedPhone = phone.trim();
        if (!formattedPhone.startsWith("+")) {
          formattedPhone = "+91" + formattedPhone;
        }

        const baseUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
        const callRes = await fetch(`${baseUrl}/api/call`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formattedPhone }),
        });
        const callData = await callRes.json();
        console.log("[Escalate API] Call response:", { 
          ok: callRes.ok, 
          devMode: callData.devMode, 
          callSid: callData.callSid,
          error: callData.error,
        });
      } catch (callError) {
        console.log("[Escalate API] Call trigger error:", callError?.message);
      }
    } else if (!phone) {
      console.log("[Escalate API] No phone number provided, skipping call trigger");
    } else {
      console.log("[Escalate API] DEV_MODE is true, skipping call trigger");
    }

    const duration = Date.now() - startTime;
    console.log("[Escalate API] Lead saved successfully:", `${duration}ms`);
    console.log("[Escalate API] ===== END (Success) =====");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.log("[Escalate API] ERROR: Failed to save lead after", `${duration}ms`);
    console.log("[Escalate API] Error details:", {
      message: error?.message,
      code: error?.code,
      stack: error?.stack?.substring(0, 500),
    });
    console.log("[Escalate API] ===== END (Error) =====");
    
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}