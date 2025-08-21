"use client";

import ProtectedRoute from "@/components/protectedRoute";
import React from "react";
import SignOut from "@/components/signOut";
import Users from "@/components/dashboard/users";
import DisplayProfile from "@/components/dashboard/profile";
import SideBar from "@/components/dashboard/sideBar";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="p-8 min-h-screen bg-gray-50">
        <SideBar />
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <SignOut />
          </div>
          <div>
            <DisplayProfile />
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <Users />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
