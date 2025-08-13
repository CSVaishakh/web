"use client";

import { useAuthStore } from "@/store/auth";
import ProtectedRoute from "@/components/protectedRoute";
import React from "react";
import SignOut from "@/components/signOut";
import Link from "next/link";
import Users from "@/components/dashboard/users";

export default function Dashboard() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  console.log(token);

  return (
    <ProtectedRoute>
      <div className="p-8 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <p className="text-lg text-gray-600 mb-4">Welcome! User ID: {user}</p>
            <div className="flex gap-4">
              <SignOut/>
              <button className="px-6 py-3 bg-blue-500 text-white border-none rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg">
                <Link href={'/dashboard/profile'}>Profile</Link>
              </button>
            </div>
            <Users/>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}