'use client'

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
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('No authentication token found');
        setTimeout(() => router.push('/'), 2000);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:5000/verify', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = response.data;
          if (data.userid) {
            setUser(data.userid);
            setIsVerified(true);
          } else {
            setError('Invalid authentication response');
            logout();
            setTimeout(() => router.push('/'), 2000);
          }
        } else {
          setError('Authentication failed. Invalid or expired token.');
          logout();
          setTimeout(() => router.push('/'), 2000);
        }
      } catch (error) {
        setError(String(error));
        logout();
        setTimeout(() => router.push('/'), 2000);
      }
    };

    verifyToken();
  }, [token, router, setUser, logout]);

  if (error) {
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

  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}