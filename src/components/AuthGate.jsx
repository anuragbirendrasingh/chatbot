"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/client";

export default function AuthGate({ onReady }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleGoogleSignIn = async () => {
    setStatus("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setStatus("Google sign-in failed. Please try again.");
      console.error(err);
    }
  };

  const handleRegister = async () => {
    if (!user || !phone.trim()) return;
    setSubmitting(true);
    setStatus("");

    // Ensure phone is in E.164 format (e.g. +91XXXXXXXXXX)
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+91" + formattedPhone; // default to India country code
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
          photoURL: user.photoURL || "",
          phone: formattedPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Registration failed");
      }

      if (data?.warning) {
        setStatus(data.warning);
      }

      // Trigger call — now actually check the response
      const callRes = await fetch("/api/call/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formattedPhone, name: user.displayName || "" }),
      });
      const callData = await callRes.json();
      if (!callRes.ok) {
        throw new Error(callData?.error || "Call failed to place");
      }

      setStatus(callData.devMode
        ? "Registered (dev mode — call was not actually placed)."
        : "Registered. Our bot will call you shortly.");
      onReady?.(true);
    } catch (err) {
      // Show detailed error message including Twilio code if available
      const errorMsg = err.message || "Registration failed. Please try again.";
      const twilioCode = err.twilioCode ? ` (Error code: ${err.twilioCode})` : "";
      setStatus(`${errorMsg}${twilioCode}`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setPhone("");
    onReady?.(false);
  };

  if (loading) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
        <h1 className="text-xl font-semibold text-gray-900">Admission Assistant</h1>
        <p className="text-sm text-gray-500 mt-1">
          Sign in with Google and add your phone number to receive a callback.
        </p>

        {!user ? (
          <button
            onClick={handleGoogleSignIn}
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue with Google
          </button>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{user.displayName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRegister}
                disabled={submitting || !phone.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
              >
                {submitting ? "Registering..." : "Register & Call Me"}
              </button>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        )}

        {status ? (
          <p className="mt-3 text-xs text-gray-500">{status}</p>
        ) : null}
      </div>
    </div>
  );
}
