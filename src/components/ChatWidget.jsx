"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import ChatMessage from "./ChatMessage";
import QuickReplies from "./QuickReplies";
import { QUICK_REPLIES } from "@/lib/gemini-client";
import { v4 as uuidv4 } from "uuid";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase/config";

export default function ChatWidget({ enabled = true }) {
  if (!enabled) return null;
  const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "👋 Hi! I'm your admission assistant. I can help you with courses, fees, eligibility, and the admission process. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ phone: "" });
  const [leadSaved, setLeadSaved] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [openCount, setOpenCount] = useState(0);
  const [showAuthCard, setShowAuthCard] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [authPhone, setAuthPhone] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const bottomRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Show lead form after 2 messages
  useEffect(() => {
    if (messageCount === 2 && !leadSaved) {
      setShowLeadForm(true);
    }
  }, [messageCount, leadSaved]);

  useEffect(() => {
    if (openCount >= 2 && !authUser) {
      setShowAuthCard(true);
    }
  }, [openCount, authUser]);

  const handleToggleChat = () => {
    setIsOpen((o) => !o);
    setOpenCount((c) => c + 1);
  };

  const handleGoogleSignIn = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      if (isDevMode) {
        setAuthUser({
          uid: "dev-user",
          email: "dev@example.com",
          displayName: "Dev User",
          photoURL: "",
        });
        setShowAuthCard(true);
        return;
      }
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setAuthUser(result.user);
      setShowAuthCard(true);
    } catch (error) {
      const code = error?.code;
      const message = code === "auth/configuration-not-found"
        ? "Google sign-in is not enabled in Firebase Auth. Please enable the Google provider in Firebase Console."
        : code === "auth/popup-closed-by-user"
          ? "Sign-in popup was closed before completion. Please try again."
          : code === "auth/popup-blocked"
            ? "Browser blocked the popup. Please allow popups for this site and try again."
            : "Google sign-in failed. Please try again.";
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!authUser || !authPhone.trim()) return;
    setAuthError("");
    setAuthLoading(true);

    // Ensure phone is in E.164 format (e.g. +91XXXXXXXXXX)
    let phone = authPhone.trim();
    if (!phone.startsWith("+")) {
      phone = "+91" + phone; // default to India country code
    }

    try {
      // Step 1: Register user in Firestore
      const regRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: authUser.uid,
          email: authUser.email,
          name: authUser.displayName,
          photoURL: authUser.photoURL,
          phone,
        }),
      });
      const regData = await regRes.json();
      if (!regRes.ok) {
        throw new Error(regData?.error || "Registration failed");
      }

      // Step 2: Trigger call via Twilio
      const callRes = await fetch("/api/call/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          name: authUser.displayName || "there",
        }),
      });
      const callData = await callRes.json();
      if (!callRes.ok) {
        throw new Error(callData?.error || "Call failed to place");
      }

      // Step 3: Show success or dev-mode message
      const botMsg = callData.devMode
        ? "Thanks for registering! (Dev mode — call was not actually placed.)"
        : "Thanks for registering! We have triggered a call to your number with details about our business.";

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: botMsg, timestamp: new Date() },
      ]);

      setShowAuthCard(false);
    } catch (err) {
      // Show error in auth card
      const errorMsg = err.message || "Registration failed. Please try again.";
      const twilioCode = err.twilioCode ? ` (Error code: ${err.twilioCode})` : "";
      setAuthError(`${errorMsg}${twilioCode}`);

      // Also show error as bot message in chat for visibility
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `❌ ${errorMsg}${twilioCode}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setAuthLoading(false);
    }
  };

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    setInput("");
    setLoading(true);

    // Add user message to UI immediately
    const userMsg = { role: "user", content: messageText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setMessageCount((c) => c + 1);

    // Get phone number - prioritize lead form, then auth
    const phone = leadSaved ? leadData.phone : (authPhone || null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          sessionId,
          chatHistory: messages,
          phone, // Send phone number for call triggering
        }),
      });

      const data = await res.json();

      const botMsg = {
        role: "bot",
        content: data.answer,
        timestamp: new Date(),
        escalated: data.escalate,
      };

      setMessages((prev) => [...prev, botMsg]);

      // If escalated — show lead form immediately (if not already saved)
      if (data.escalate && !leadSaved) {
        setShowLeadForm(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const saveLead = async () => {
    if (!leadData.phone.trim()) return;

    // Ensure phone is in E.164 format
    let phone = leadData.phone.trim();
    if (!phone.startsWith("+")) {
      phone = "+91" + phone;
    }

    try {
      const res = await fetch("/api/escalate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, sessionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to save lead");
      }

      setLeadSaved(true);
      setShowLeadForm(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `Thank you! 🎉 Our counsellor will call you on ${phone} shortly. Is there anything else I can help you with?`,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `Sorry, failed to save your phone number. ${err.message || "Please try again."}`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center hover:bg-blue-700 transition-all duration-200 hover:scale-105"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="bg-blue-600 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
              🎓
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Admission Assistant</p>
              <p className="text-blue-100 text-xs">Typically replies instantly</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white/70 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}

            {/* Quick replies — show only at start */}
            {messages.length === 1 && (
              <QuickReplies
                options={QUICK_REPLIES}
                onSelect={(opt) => sendMessage(opt)}
              />
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs">
                  🎓
                </div>
                <div className="bg-white rounded-2xl px-3 py-2 shadow-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Lead capture form */}
            {showLeadForm && !leadSaved && (
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-blue-100 space-y-2">
                <p className="text-xs font-semibold text-blue-700">
                  📞 Get a free counselling call!
                </p>
                <input
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Phone number"
                  value={leadData.phone}
                  onChange={(e) => setLeadData((d) => ({ ...d, phone: e.target.value }))}
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveLead}
                    className="flex-1 bg-blue-600 text-white text-xs rounded-lg py-2 font-medium hover:bg-blue-700"
                  >
                    Request Callback
                  </button>
                  <button
                    onClick={() => setShowLeadForm(false)}
                    className="text-xs text-gray-400 hover:text-gray-600 px-2"
                  >
                    Later
                  </button>
                </div>
              </div>
            )}

            {/* Google auth + phone capture after 2 clicks */}
            {showAuthCard && (
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-blue-100 space-y-2">
                <p className="text-xs font-semibold text-blue-700">
                  🔐 Register with Google to get a callback
                </p>

                {!authUser && (
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-blue-600 text-white text-xs rounded-lg py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
                    disabled={authLoading}
                  >
                    {authLoading ? "Signing in..." : (isDevMode ? "Continue (Dev Mode)" : "Continue with Google")}
                  </button>
                )}

                {authUser && (
                  <>
                    <div className="flex items-center gap-2">
                      {authUser.photoURL ? (
                        <img
                          src={authUser.photoURL}
                          alt="Profile"
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">👤</div>
                      )}
                      <p className="text-xs text-gray-600">{authUser.displayName || authUser.email}</p>
                    </div>

                    <input
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
                      placeholder="Your phone number"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                    />

                    <button
                      onClick={handleRegister}
                      className="w-full bg-blue-600 text-white text-xs rounded-lg py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
                      disabled={authLoading || !authPhone.trim()}
                    >
                      {authLoading ? "Registering..." : "Register & Get a Call"}
                    </button>
                  </>
                )}

                {authError && (
                  <p className="text-[11px] text-red-500">{authError}</p>
                )}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-blue-400"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 transition-all"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center py-1 bg-white">
            <p className="text-[10px] text-gray-300">Powered by AI · Responses may vary</p>
          </div>
        </div>
      )}
    </>
  );
}