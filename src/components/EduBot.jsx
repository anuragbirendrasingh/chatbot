"use client";

import { useState, useRef, useEffect } from "react";
import { DEFAULT_SUGGESTIONS } from "@/lib/eduBotData";
import { matchIntent, buildResponse } from "@/lib/eduBotLogic";

// ─────────────────────────────────────────────
// TYPEWRITER HOOK
// ─────────────────────────────────────────────
function useTypewriter(text, speed = 18, active = false) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active || !text) { setDisplayed(text || ""); setDone(true); return; }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(t); setDone(true); }
    }, speed);
    return () => clearInterval(t);
  }, [text, active]);
  return { displayed, done };
}

// ─────────────────────────────────────────────
// CARD COMPONENTS
// ─────────────────────────────────────────────
function Chip({ label }) {
  return (
    <span style={{
      display: "inline-block", background: "#e8f4f0", color: "#1a7a5e",
      fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20,
      letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8,
    }}>{label}</span>
  );
}

function InfoTable({ rows }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: 13 }}>
      <tbody>
        {rows.map(([k, v], i) => (
          <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
            <td style={{ padding: "6px 8px 6px 0", color: "#888", fontWeight: 600, width: "45%", whiteSpace: "nowrap" }}>{k}</td>
            <td style={{ padding: "6px 0", color: "#222", fontWeight: 500 }}>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CompareTable({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto", marginTop: 10 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ background: "#f5faf8" }}>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: "7px 10px", textAlign: "left", color: "#1a7a5e", fontWeight: 700, borderBottom: "2px solid #d4ede5", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafffe" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "7px 10px", color: j === 0 ? "#1a7a5e" : "#333", fontWeight: j === 0 ? 600 : 400, whiteSpace: "nowrap" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ListItems({ label, items }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 5 }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map((item, i) => (
          <span key={i} style={{
            background: "#f0f9f5", border: "1px solid #c8e8dc",
            color: "#1a7a5e", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 500,
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function Steps({ items }) {
  return (
    <ol style={{ margin: "10px 0 0 0", paddingLeft: 18 }}>
      {items.map((s, i) => (
        <li key={i} style={{ fontSize: 13, color: "#333", marginBottom: 6, lineHeight: 1.5 }}>{s}</li>
      ))}
    </ol>
  );
}

function RelatedLinks({ links }) {
  return (
    <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #eef5f2" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#aaa", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
        <span>🔗</span> Related Links
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {links.map((l, i) => (
          <a key={i} href={l.href} style={{
            fontSize: 12, color: "#1a7a5e", fontWeight: 600,
            textDecoration: "none", borderBottom: "1px dashed #1a7a5e",
            paddingBottom: 1,
          }}
            onMouseEnter={e => e.target.style.color = "#0d5c46"}
            onMouseLeave={e => e.target.style.color = "#1a7a5e"}
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// BOT MESSAGE CARD
// ─────────────────────────────────────────────
function BotCard({ data, isNew, onCTAClick }) {
  const mainText = data.text || "";
  const { displayed, done } = useTypewriter(mainText, 18, isNew && !!mainText);

  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: "14px 16px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)", maxWidth: "100%",
      animation: isNew ? "fadeSlideIn 0.3s ease" : "none",
    }}>
      {data.chip && <Chip label={data.chip} />}
      {data.title && <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{data.title}</div>}
      {data.meta && <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{data.meta}</div>}
      {mainText && <div style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{done ? mainText : displayed}</div>}
      {data.table && done && <InfoTable rows={data.table} />}
      {data.compareTable && done && <CompareTable {...data.compareTable} />}
      {data.list && done && <ListItems {...data.list} />}
      {data.steps && done && <Steps items={data.steps} />}
      {data.links && done && <RelatedLinks links={data.links} />}
      {data.suggestions && done && (
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {data.suggestions.map((s, i) => (
            <button key={i} onClick={() => onCTAClick(s)} style={{
              background: "#f0f9f5", border: "1px solid #c8e8dc", color: "#1a7a5e",
              borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600,
              cursor: "pointer",
            }}>{s}</button>
          ))}
        </div>
      )}
      {data.cta && done && !data.ctaImmediate && (
        <button onClick={onCTAClick} style={{
          marginTop: 14, background: "linear-gradient(135deg, #1a7a5e, #22a077)",
          color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px",
          fontSize: 13, fontWeight: 700, cursor: "pointer", width: "100%",
        }}>
          🎓 Get Free Counselling →
        </button>
      )}
      {data.ctaImmediate && done && (
        <button onClick={onCTAClick} style={{
          marginTop: 10, background: "linear-gradient(135deg, #1a7a5e, #22a077)",
          color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px",
          fontSize: 13, fontWeight: 700, cursor: "pointer", width: "100%",
        }}>
          📞 Book Free Counselling Session
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// AUTH MODAL — Phone + Google Auth
// ─────────────────────────────────────────────
function AuthModal({ onClose, onAuth, type }) {
  const [form, setForm] = useState({ phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e) => setForm({ ...form, phone: e.target.value });

  const submitPhone = () => {
    if (!form.phone) return;
    console.log("PHONE CAPTURED:", form.phone);
    setSubmitted(true);
    setTimeout(() => { onAuth({ type: "phone", value: form.phone }); onClose(); }, 1500);
  };

  const handleGoogleAuth = () => {
    console.log("GOOGLE AUTH CLICKED");
    // 🔁 Integrate Google Auth here
    onAuth({ type: "google" });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999, backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 18, padding: "28px 28px 24px",
          width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          animation: "fadeSlideIn 0.3s ease",
        }}
      >
        {!submitted ? (
          <>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", marginBottom: 4 }}>
              {type === "phone" ? "Continue with Phone" : "Continue with Google"}
            </div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>
              {type === "phone"
                ? "Enter your phone number to continue chatting with AI."
                : "Sign in with Google to continue chatting with AI."}
            </div>

            {type === "google" && (
              <>
                <button onClick={handleGoogleAuth} style={{
                  width: "100%", background: "#fff", border: "1.5px solid #e0e0e0",
                  borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", marginTop: 8, display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 10, color: "#333",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.target.style.background = "#f5f5f5"}
                  onMouseLeave={e => e.target.style.background = "#fff"}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path d="M17.64 9.2c0-.637-.057-1.252-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.715H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.9574.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.159 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </>
            )}

            {type === "phone" && (
              <>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 5 }}>Phone Number</label>
                  <input
                    type="tel" placeholder="+91 98765 43210"
                    value={form.phone} onChange={handlePhoneChange}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1.5px solid #e0e0e0", fontSize: 13, outline: "none",
                      boxSizing: "border-box", transition: "border 0.2s",
                    }}
                    onFocus={e => e.target.style.border = "1.5px solid #1a7a5e"}
                    onBlur={e => e.target.style.border = "1.5px solid #e0e0e0"}
                  />
                </div>
                <button onClick={submitPhone} style={{
                  width: "100%", background: "linear-gradient(135deg, #1a7a5e, #22a077)",
                  color: "#fff", border: "none", borderRadius: 10, padding: "12px",
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                }}>
                  Continue with Phone
                </button>
              </>
            )}

            <button onClick={onClose} style={{
              width: "100%", background: "transparent", border: "none",
              color: "#aaa", fontSize: 12, marginTop: 10, cursor: "pointer",
            }}>
              Cancel
            </button>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1a7a5e" }}>Verified!</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 6 }}>You can continue chatting now.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LEAD CAPTURE MODAL
// ─────────────────────────────────────────────
function LeadModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: "", course: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    if (!form.name || !form.phone) return;
    // 🔁 Replace with your real API call
    console.log("LEAD CAPTURED:", form);
    setSubmitted(true);
    setTimeout(() => { onSubmit(form); onClose(); }, 1800);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 18, padding: "28px 28px 24px",
        width: 340, boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        animation: "fadeSlideIn 0.3s ease",
      }}>
        {!submitted ? (
          <>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", marginBottom: 4 }}>Get Free Counselling</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Our experts will call you within 24 hrs</div>
            {[
              { name: "name", label: "Your Name", placeholder: "e.g. Rahul Sharma", type: "text" },
              { name: "phone", label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
              { name: "course", label: "Interested In (optional)", placeholder: "e.g. MBA, B.Tech", type: "text" },
            ].map((f) => (
              <div key={f.name} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 5 }}>{f.label}</label>
                <input
                  name={f.name} type={f.type} placeholder={f.placeholder}
                  value={form[f.name]} onChange={handle}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: 8,
                    border: "1.5px solid #e0e0e0", fontSize: 13, outline: "none",
                    boxSizing: "border-box",
                    transition: "border 0.2s",
                  }}
                  onFocus={e => e.target.style.border = "1.5px solid #1a7a5e"}
                  onBlur={e => e.target.style.border = "1.5px solid #e0e0e0"}
                />
              </div>
            ))}
            <button onClick={submit} style={{
              width: "100%", background: "linear-gradient(135deg, #1a7a5e, #22a077)",
              color: "#fff", border: "none", borderRadius: 10, padding: "12px",
              fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 4,
            }}>
              Submit & Get Callback
            </button>
            <button onClick={onClose} style={{
              width: "100%", background: "transparent", border: "none",
              color: "#aaa", fontSize: 12, marginTop: 10, cursor: "pointer",
            }}>
              Maybe later
            </button>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1a7a5e" }}>You're all set, {form.name}!</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 6 }}>Our counsellor will call you soon.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// AI FALLBACK — uses existing chat API (no context to save tokens)
// ─────────────────────────────────────────────
async function callAI(userMessage) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMessage,
        chatHistory: [], // No context to save tokens
      }),
    });
    const data = await res.json();
    return {
      chip: "AI Answer",
      text: data.answer,
      links: [{ label: "Browse All Colleges", href: "#" }],
      cta: true
    };
  } catch (error) {
    return {
      chip: "AI Answer",
      text: "Sorry, I couldn't find an answer. Please try rephrasing.",
      links: [{ label: "Browse All Colleges", href: "#" }],
      cta: true
    };
  }
}

// ─────────────────────────────────────────────
// MAIN CHATBOT COMPONENT
// ─────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      data: {
        chip: "Welcome",
        text: "Hi! I'm ChatBot. Ask me about colleges, fees, courses, or entrance exams.",
        suggestions: ["NIU Courses", "JEE Main 2026", "Compare Colleges", "Get Counselling"],
      },
      isNew: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState("google"); // "google" or "phone"
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [aiCallCount, setAiCallCount] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const q = (text || input).trim();
    if (!q) return;

    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: q }]);

    setLoading(true);

    const intent = matchIntent(q);
    let responseData;

    if (intent.type === "ai_needed") {
      // Check if user is authenticated
      if (!isAuthenticated) {
        // First AI call - show Google auth
        if (aiCallCount === 0) {
          setAuthModalType("google");
          setShowAuthModal(true);
          setLoading(false);
          return;
        }
        // Subsequent AI calls - alternate between Google and Phone
        setAuthModalType(aiCallCount % 2 === 0 ? "google" : "phone");
        setShowAuthModal(true);
        setLoading(false);
        return;
      }

      // Authenticated - allow AI call
      responseData = await callAI(q);
      const newCount = aiCallCount + 1;
      setAiCallCount(newCount);
    } else {
      // Static content - no auth required
      responseData = buildResponse(intent);
      // Small delay to simulate "thinking" — feels more natural
      await new Promise((r) => setTimeout(r, 400));
    }

    setMessages((prev) => [
      ...prev,
      { role: "bot", data: responseData, isNew: true },
    ]);
    setLoading(false);
  };

  const handleAuth = (authData) => {
    setIsAuthenticated(true);
    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        data: {
          chip: "✅ Verified",
          text: `Great! You're now verified. You can continue asking questions.`,
        },
        isNew: true,
      },
    ]);
  };

  const handleLeadSubmit = (form) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        data: {
          chip: "✅ Confirmed",
          text: `Thanks ${form.name}! Our counsellor will call ${form.phone} shortly. You're in good hands! 🎓`,
        },
        isNew: true,
      },
    ]);
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .edubot-input:focus { outline: none; border-color: #6366f1 !important; }
        .chip-btn:hover { background: #c7d2fe !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c7d2fe; border-radius: 10px; }
      `}</style>

      {/* FAB BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed", bottom: 28, right: 28,
            width: 58, height: 58, borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            border: "none", cursor: "pointer",
            boxShadow: "0 4px 20px rgba(99,102,241,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "pulse 2.5s infinite", zIndex: 1000,
          }}
          title="Open ChatBot"
        >
          <span style={{ fontSize: 28 }}>🤖</span>
        </button>
      )}

      {/* CHAT WIDGET */}
      {open && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, width: 370,
          height: 580, background: "#f5faf8", borderRadius: 20,
          boxShadow: "0 12px 50px rgba(0,0,0,0.18)",
          display: "flex", flexDirection: "column",
          zIndex: 1000, overflow: "hidden",
          animation: "fadeSlideIn 0.3s ease",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}>

          {/* HEADER */}
          <div style={{
            background: "linear-gradient(135deg, #0f172a, #334155)",
            padding: "14px 16px", display: "flex", alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>
                🤖
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>ChatBot</div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>
                  <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#38bdf8", marginRight: 4, verticalAlign: "middle" }} />
                  Online · Replies instantly
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
              borderRadius: "50%", width: 30, height: 30, cursor: "pointer",
              fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>

          {/* MESSAGES */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                {msg.role === "user" ? (
                  <div style={{
                    background: "linear-gradient(135deg, #6366f1, #a855f7)",
                    color: "#fff", borderRadius: "14px 14px 4px 14px",
                    padding: "9px 14px", maxWidth: "78%", fontSize: 13,
                    fontWeight: 500, lineHeight: 1.5,
                    boxShadow: "0 2px 8px rgba(99,102,241,0.25)",
                  }}>
                    {msg.text}
                  </div>
                ) : (
                  <div style={{ maxWidth: "95%" }}>
                    <BotCard
                      data={msg.data}
                      isNew={msg.isNew}
                      onCTAClick={(s) => {
                        if (typeof s === "string" && s.length > 2) sendMessage(s);
                        else setShowModal(true);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", gap: 5, padding: "10px 14px", background: "#fff", borderRadius: 12, width: "fit-content", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{
                    width: 8, height: 8, borderRadius: "50%", background: "#6366f1",
                    animation: `pulse 1s ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* SUGGESTION CHIPS */}
          <div style={{
            padding: "6px 12px 4px", display: "flex", gap: 7,
            overflowX: "auto", background: "#f5faf8",
          }}>
            {DEFAULT_SUGGESTIONS.map((s, i) => (
              <button key={i} className="chip-btn" onClick={() => sendMessage(s)} style={{
                background: "#e0e7ff", border: "1px solid #c7d2fe", color: "#6366f1",
                borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 600,
                cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s",
              }}>{s}</button>
            ))}
          </div>

          {/* INPUT */}
          <div style={{
            padding: "10px 12px 14px",
            background: "#fff", borderTop: "1px solid #eef5f2",
            display: "flex", gap: 8, alignItems: "center",
          }}>
            <input
              className="edubot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
              placeholder="Ask about colleges, exams, fees..."
              style={{
                flex: 1, padding: "10px 14px", borderRadius: 24,
                border: "1.5px solid #e2e8f0", fontSize: 13,
                background: "#f8fafc", transition: "border 0.2s",
              }}
            />
            <button
              onClick={() => !loading && sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: input.trim()
                  ? "linear-gradient(135deg, #6366f1, #a855f7)" : "#ddd",
                border: "none", cursor: input.trim()
                  ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 17, transition: "background 0.2s",
                color: "#fff",
              }}
            >➤</button>
          </div>
          <div style={{ textAlign: "center", fontSize: 10, color: "#bbb", padding: "0 0 8px", background: "#fff" }}>
            ChatBot · Powered by AI · Data may vary
          </div>
        </div>
      )}

      {/* LEAD MODAL */}
      {showModal && (
        <LeadModal
          onClose={() => setShowModal(false)}
          onSubmit={handleLeadSubmit}
        />
      )}

      {/* AUTH MODAL */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
          type={authModalType}
        />
      )}
    </>
  );
}
