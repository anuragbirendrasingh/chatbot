import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ARGminds - AI-Powered Higher Education Guide for Indian Students",
  description: "Find your perfect college with ARGminds. Explore top private and government universities, entrance exams, fees, NIRF rankings, and career opportunities in India.",
  keywords: "colleges in India, universities, entrance exams, JEE Main, NEET, CUET, NIRF ranking, engineering colleges, medical colleges, career guidance, college admission",
  authors: [{ name: "ARGminds" }],
  openGraph: {
    title: "ARGminds - AI-Powered Higher Education Guide",
    description: "Find your perfect college with AI-powered recommendations. Explore top universities, entrance exams, and career opportunities.",
    url: "https://argminds.com",
    siteName: "ARGminds",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARGminds - AI-Powered Higher Education Guide",
    description: "Find your perfect college with AI-powered recommendations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
