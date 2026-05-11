import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// Save lead (phone captured in chat)
export async function POST(request) {
  const startTime = Date.now();
  console.log("[Escalate API] ===== START =====");
  console.log("[Escalate API] Timestamp:", new Date().toISOString());
  
  try {
    const { name, phone, email, courseInterest, sessionId } = await request.json();
    console.log("[Escalate API] Request payload:", { 
      name, 
      phone, 
      email, 
      courseInterest, 
      sessionId,
      hasName: !!name,
      hasPhone: !!phone,
    });

    const isDevMode = process.env.DEV_MODE === "true";
    const nodeEnv = process.env.NODE_ENV;
    console.log("[Escalate API] Environment:", { isDevMode, nodeEnv });

    console.log("[Escalate API] Firebase Admin status:", { adminDbInitialized: !!adminDb });

    if (adminDb && !isDevMode) {
      console.log("[Escalate API] Saving lead to Firestore");
      const docRef = await adminDb.collection("leads").add({
        name: name || "",
        phone,
        email: email || "",
        courseInterest: courseInterest || "Not specified",
        sessionId,
        status: "new",
        createdAt: new Date(),
      });
      console.log("[Escalate API] Lead saved successfully to Firestore:", docRef.id);
    } else if (!adminDb && !isDevMode) {
      console.log("[Escalate API] WARNING: Firebase Admin not configured, skipping lead storage");
    } else {
      console.log("[Escalate API] Dev mode - skipping lead storage");
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