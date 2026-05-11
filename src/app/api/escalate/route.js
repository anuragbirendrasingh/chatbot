import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// Save lead (name + phone captured in chat)
export async function POST(request) {
  try {
    const { name, phone, email, courseInterest, sessionId } = await request.json();

    const isDevMode = process.env.DEV_MODE === "true";
    if (adminDb && !isDevMode) {
      await adminDb.collection("leads").add({
        name,
        phone,
        email: email || "",
        courseInterest: courseInterest || "Not specified",
        sessionId,
        status: "new",
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Escalate API error:", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}