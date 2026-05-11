"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import ChatBot from "./EduBot";
import AuthModal from "./AuthModal";
import Profile from "./Profile";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [showChat, setShowChat] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    // Check if user was redirected from profile page
    const shouldOpenAuthModal = sessionStorage.getItem("openAuthModal");
    if (shouldOpenAuthModal === "true") {
      setShowAuthModal(true);
      sessionStorage.removeItem("openAuthModal");
    }
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <img 
                src="/args-mode-lightmode.png"
                alt="ARGminds" 
                className="h-16 w-auto object-contain" 
              />
              <span className="font-bold text-gray-900 dark:text-white text-lg">ARG<span className="text-brand-500">minds</span></span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              <button onClick={() => router.push("/private-universities")} className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-xl transition-all">
                Private Universities
              </button>
              <button onClick={() => router.push("/government-universities")} className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-xl transition-all">
                Government Universities
              </button>
              <button onClick={() => router.push("/exams")} className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-xl transition-all">
                Entrance Exams
              </button>
              <button onClick={() => router.push("/tools")} className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-xl transition-all">
                🛠️ Tools
              </button>
              <button onClick={() => router.push("/compare")} className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-xl transition-all">
                Compare
              </button>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    {user.photoUrl && (
                      <img
                        src={user.photoUrl}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border-2 border-brand-500 shadow-md"
                      />
                    )}
                    <button onClick={() => router.push("/profile")} className="btn-ghost text-sm">Profile</button>
                  </div>
                  <button onClick={logout} className="btn-primary text-sm">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => setShowAuthModal(true)} className="btn-ghost text-sm">Login</button>
                  <button onClick={() => setShowAuthModal(true)} className="btn-primary text-sm">Get Counselling</button>
                </>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
            AI-Powered Education Counselling
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4 max-w-3xl mx-auto">
            Find Your Perfect College
            <span className="text-brand-500"> With AI</span>
          </h1>

          {/* Sub */}
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
            Chat with our AI counsellor, compare colleges, explore exams — all in one place.
          </p>

          {/* Search bar */}
          <div className="flex items-center gap-3 max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-card">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm bg-transparent"
              placeholder="Ask AI: 'Best college for CSE with JEE 85 percentile?'"
            />
            <button onClick={() => setShowChat(true)} className="btn-primary text-sm px-4 py-2">Ask AI →</button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12">
            {[
              { n: "500+", l: "Colleges" },
              { n: "14+", l: "Entrance Exams" },
              { n: "10K+", l: "Students Helped" },
              { n: "Free", l: "AI Counselling" },
            ].map((st) => (
              <div key={st.l} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{st.n}</div>
                <div className="text-xs text-gray-500 mt-0.5">{st.l}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Everything You Need for Higher Education</h2>
            <p className="section-sub">Comprehensive guidance for your academic journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="card p-5 hover:-translate-y-0.5">
              <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">College Exploration</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Discover top universities, compare programs, and find the perfect fit for your goals. Detailed information about fees, placements, and specializations.
              </p>
            </div>
            <div className="card p-5 hover:-translate-y-0.5">
              <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exam Preparation</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Stay updated with entrance exams like JEE, NEET, CAT, MAT, and more. Get exam patterns, syllabus, eligibility criteria, and important dates.
              </p>
            </div>
            <div className="card p-5 hover:-translate-y-0.5">
              <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Guidance</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Expert counselling to help you choose the right path. Whether it's MBA, Engineering, or other fields — get personalized advice for your future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">🛠️ Free Student Tools</h2>
            <p className="section-sub">Powerful calculators, predictors, and planners to help you succeed</p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            <div className="card p-5 hover:-translate-y-0.5 border-blue-200 hover:border-blue-400">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">JEE Percentile Predictor</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Convert your JEE marks to estimated percentile and rank instantly
              </p>
              <button onClick={() => router.push("/tools")} className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                Try Tool →
              </button>
            </div>
            <div className="card p-5 hover:-translate-y-0.5 border-red-200 hover:border-red-400">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">NEET Rank Predictor</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Check your expected NEET rank and college options based on score
              </p>
              <button onClick={() => router.push("/tools")} className="text-red-600 text-sm font-semibold hover:text-red-700">
                Try Tool →
              </button>
            </div>
            <div className="card p-5 hover:-translate-y-0.5 border-green-200 hover:border-green-400">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">EMI Calculator</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Plan your education loan with monthly EMI calculations
              </p>
              <button onClick={() => router.push("/tools")} className="text-green-600 text-sm font-semibold hover:text-green-700">
                Try Tool →
              </button>
            </div>
            <div className="card p-5 hover:-translate-y-0.5 border-purple-200 hover:border-purple-400">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Path Finder</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                AI-powered quiz to discover your perfect career and stream
              </p>
              <button onClick={() => router.push("/tools")} className="text-purple-600 text-sm font-semibold hover:text-purple-700">
                Try Tool →
              </button>
            </div>
          </div>
          <div className="text-center mt-8">
            <button onClick={() => router.push("/tools")} className="btn-primary">
              Explore All 12+ Tools →
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">About ARGminds</h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                ARGminds is your trusted companion in the journey of higher education. We believe every student deserves access to quality information and guidance to make informed decisions about their future.
              </p>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Our platform provides comprehensive resources for college exploration, exam preparation, and career planning. Whether you're a high school student exploring options or a working professional looking to upskill, we're here to support you at every step.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-brand-500 text-sm">✓</span>
                  <span className="text-sm text-gray-700 font-medium">Free Access for All</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-500 text-sm">✓</span>
                  <span className="text-sm text-gray-700 font-medium">Expert Guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-500 text-sm">✓</span>
                  <span className="text-sm text-gray-700 font-medium">24/7 AI Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-500 text-sm">✓</span>
                  <span className="text-sm text-gray-700 font-medium">Updated Information</span>
                </div>
              </div>
            </div>
            <div className="bg-brand-500 p-8 rounded-3xl text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-sm leading-relaxed mb-6">
                To empower students with knowledge, guidance, and resources to make confident decisions about their higher education and career paths.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 p-4 rounded-xl">
                  <div className="text-3xl font-bold mb-1">LEARN</div>
                  <div className="text-xs">Knowledge First</div>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <div className="text-3xl font-bold mb-1">GROW</div>
                  <div className="text-xs">Skills Every Day</div>
                </div>
                <div className="bg-white/20 p-4 rounded-xl col-span-2">
                  <div className="text-3xl font-bold mb-1">ACHIEVE</div>
                  <div className="text-xs">Your True Potential</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Shape Your Future?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Join thousands of students who are already exploring their higher education options with ARGminds.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setShowChat(true)}
              className="btn-secondary"
            >
              Talk to Our AI Assistant
            </button>
            <button onClick={() => setShowAuthModal(true)} className="btn-primary">
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <img src="/argminds_logo.svg" alt="ARGminds" className="w-7 h-7" />
                <span className="text-white font-bold">ARGminds</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                AI-powered EdTech platform helping Class 12 students find their perfect college.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => router.push("/private-universities")} className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Private Universities</button>
                </li>
                <li>
                  <button onClick={() => router.push("/government-universities")} className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Government Universities</button>
                </li>
                <li>
                  <button onClick={() => router.push("/exams")} className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Entrance Exams</button>
                </li>
                <li>
                  <button onClick={() => router.push("/tools")} className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">🛠️ Student Tools</button>
                </li>
                <li>
                  <button onClick={() => router.push("/compare")} className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Compare Universities</button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Exam Calendar</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Fee Calculator</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Cutoff Predictor</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Career Guide</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">About</a>
                </li>
                <li>
                  <a href="#contact" className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Contact</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Terms</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">© 2025 ARGminds. All rights reserved.</p>
            <p className="text-xs text-gray-600">Made with ❤️ for Indian students</p>
          </div>

        </div>
      </footer>

      {/* ChatBot Component */}
      <ChatBot />

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
