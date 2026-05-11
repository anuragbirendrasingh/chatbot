"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Profile from "@/components/Profile";

export default function ProfilePage() {
  const { user, token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !token) {
      // Redirect to home with auth modal open
      router.push("/");
      // Store flag to open auth modal after redirect
      sessionStorage.setItem("openAuthModal", "true");
    }
  }, [user, token, router]);

  if (!user || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <Profile token={token} onLogout={logout} />;
}
