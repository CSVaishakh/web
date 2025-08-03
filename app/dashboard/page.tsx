"use client";

import { useAuthStore } from "@/store/auth";
import ProtectedRoute from "@/components/protectedRoute";
import React from "react";
import SignOut from "@/components/signOut";
import Link from "next/link";

export default function Dashboard() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  console.log(token);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome! User ID: {user}</p>
        <SignOut/>
        <button><Link href={'/dashboard/profile'}>Profile</Link></button>
      </div>
    </ProtectedRoute>
  );
}