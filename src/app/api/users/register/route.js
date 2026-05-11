import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const { uid, email, name, photoURL, phone } = await request.json();

    if (!uid || !email || !phone) {
      return NextResponse.json(
        { error: "uid, email, and phone are required" },
        { status: 400 }
      );
    }

    const isDevMode = process.env.DEV_MODE === "true";

    if (adminDb && !isDevMode) {
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
    }

    if (!adminDb && !isDevMode) {
      return NextResponse.json({
        success: true,
        warning: "Firebase Admin not configured. Skipped user storage.",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
