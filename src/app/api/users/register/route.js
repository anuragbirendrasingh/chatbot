import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(request) {
  const startTime = Date.now();
  console.log("[Register API] ===== START =====");
  console.log("[Register API] Timestamp:", new Date().toISOString());
  
  try {
    const { uid, email, name, photoURL, phone } = await request.json();
    console.log("[Register API] Request payload:", { uid, email, name, phone, hasPhoto: !!photoURL });

    if (!uid || !email || !phone) {
      console.log("[Register API] ERROR: Missing required fields", { hasUid: !!uid, hasEmail: !!email, hasPhone: !!phone });
      return NextResponse.json(
        { error: "uid, email, and phone are required" },
        { status: 400 }
      );
    }

    console.log("[Register API] Firebase Admin status:", { adminDbInitialized: !!adminDb });

    if (adminDb) {
      console.log("[Register API] Saving user to Firestore:", uid);
      await adminDb.collection("users").doc(uid).set(
        {
          uid,
          email,
          name: name || "",
          photoURL: photoURL || "",
          phone,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        { merge: true }
      );
      console.log("[Register API] User saved successfully to Firestore");
    } else {
      console.log("[Register API] WARNING: Firebase Admin not configured, skipping user storage");
      const duration = Date.now() - startTime;
      console.log("[Register API] ===== END (Warning) =====", `${duration}ms`);
      return NextResponse.json({
        success: true,
        warning: "Firebase Admin not configured. Skipped user storage.",
      });
    }

    const duration = Date.now() - startTime;
    console.log("[Register API] Registration successful:", `${duration}ms`);
    console.log("[Register API] ===== END (Success) =====");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.log("[Register API] ERROR: Registration failed after", `${duration}ms`);
    console.log("[Register API] Error details:", {
      message: error?.message,
      code: error?.code,
      stack: error?.stack?.substring(0, 500),
    });
    console.log("[Register API] ===== END (Error) =====");
    
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
