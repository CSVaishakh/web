'use client';

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  // null = checking, true = verified, false = failed
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for token to exist before checking
    if (!token) return;

    const verifyToken = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200 && response.data.userid) {
          setUser(response.data.userid);
          setIsVerified(true);
        } else {
          setError("Authentication failed. Invalid or expired token.");
          setIsVerified(false);
        }
      } catch (err) {
        setError("Error verifying authentication. Please log in again.");
        setIsVerified(false);
      }
    };

    verifyToken();
  }, [token, setUser]);

  // When verification fails, logout & redirect
  useEffect(() => {
    if (isVerified === false) {
      logout();
      const timer = setTimeout(() => router.push("/"), 1500);
      return () => clearTimeout(timer);
    }
  }, [isVerified, logout, router]);

  // Loader while checking
  if (isVerified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (isVerified === false && error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  // Verified successfully
  return <>{children}</>;
}
