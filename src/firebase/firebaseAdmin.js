import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminDb = null;

try {
  console.log("[Firebase Admin] ===== INITIALIZING =====");
  console.log("[Firebase Admin] Checking credentials...");
  
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const hasCreds =
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    privateKey;

  console.log("[Firebase Admin] Credential check:", {
    hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
    hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
    hasPrivateKey: !!privateKey,
    privateKeyLength: privateKey?.length || 0,
  });

  if (hasCreds) {
    console.log("[Firebase Admin] All credentials present, initializing...");
    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      });
      console.log("[Firebase Admin] Firebase Admin app initialized");
    } else {
      console.log("[Firebase Admin] Firebase Admin app already initialized");
    }

    adminDb = getFirestore();
    console.log("[Firebase Admin] Firestore instance created successfully");
  } else {
    console.warn("[Firebase Admin] WARNING: Firebase Admin not initialized - missing credentials");
    console.warn("[Firebase Admin] Check Vercel environment variables for:");
    console.warn("[Firebase Admin] - FIREBASE_PROJECT_ID");
    console.warn("[Firebase Admin] - FIREBASE_CLIENT_EMAIL");
    console.warn("[Firebase Admin] - FIREBASE_PRIVATE_KEY");
  }
} catch (error) {
  console.warn("[Firebase Admin] ERROR: Firebase Admin not initialized:", error?.message || error);
  console.warn("[Firebase Admin] Error details:", {
    message: error?.message,
    code: error?.code,
    stack: error?.stack?.substring(0, 300),
  });
  adminDb = null;
}

console.log("[Firebase Admin] ===== INITIALIZATION COMPLETE =====");
console.log("[Firebase Admin] adminDb status:", !!adminDb);

export { adminDb };