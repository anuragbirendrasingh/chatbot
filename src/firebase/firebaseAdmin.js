import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminDb = null;

try {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const hasCreds =
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    privateKey;

  if (hasCreds) {
    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      });
    }

    adminDb = getFirestore();
  } else {
    console.warn("Firebase Admin not initialized: missing credentials");
  }
} catch (error) {
  console.warn("Firebase Admin not initialized:", error?.message || error);
  adminDb = null;
}

export { adminDb };