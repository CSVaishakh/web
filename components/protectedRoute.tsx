'use client'

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, setUser, logout } = useAuthStore();
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
        const response = await axios.get('http://localhost:5000/verify', {
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
      <div>
        <div>
          <h2>Authentication Error</h2>
          <p>{error}</p>
          <p>Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return null;
  }

  return <>{children}</>;
}