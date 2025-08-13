'use client'

import React, { useState } from "react";
import Image from "next/image";
import SignUp from "@/components/home/signUp";
import SignIn from "@/components/home/signIn";
import AdminSignUp from "@/components/home/adminSignUp";

export default function Home() {
  const [view, setView] = useState<'signup' | 'signin'>('signup')
  const [signupType, setSignupType] = useState<'user' | 'admin'>('user')

  const handleSignUp = () => setView('signup')
  const handleSignIn = () => setView('signin')

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl w-full items-center">
        <div className="flex flex-col justify-center p-8 order-2 lg:order-1">
          <div className="text-center lg:text-left">
            <div className="mb-6 flex justify-center lg:justify-start">
              <Image
                src={'/TaskStream.svg'}
                alt="TaskStream Logo"
                height={1000}
                width={1000}
                className="w-40 sm:w-52 md:w-64 lg:w-80 h-auto"
                priority
                sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, (max-width: 1024px) 256px, 320px"
              />
            </div>
            <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">A Single platform for Streamlining Tasks, Optimizing Management & Gathering Insights</p>
          </div>
        </div>
        
        <div className="flex justify-center items-center order-1 lg:order-2">
          <div className="w-full max-w-md">
            <div className="flex gap-4 justify-center mb-8 flex-wrap sm:flex-nowrap">
              <button
                className={`px-10 py-4 border-2 cursor-pointer rounded-xl font-semibold text-base transition-all duration-300 min-w-[140px] shadow-sm w-full sm:w-auto ${view === 'signup' ? 'bg-blue-600 text-white border-blue-600 shadow-blue-600/25 -translate-y-0.5' : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:-translate-y-0.5'}`}
                onClick={handleSignUp}
              >
                SignUp
              </button>
              <button
                className={`px-10 py-4 border-2 cursor-pointer rounded-xl font-semibold text-base transition-all duration-300 min-w-[140px] shadow-sm w-full sm:w-auto ${view === 'signin' ? 'bg-blue-600 text-white border-blue-600 shadow-blue-600/25 -translate-y-0.5' : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:-translate-y-0.5'}`}
                onClick={handleSignIn}
              >
                SignIn
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-slate-200 w-full">
              <h3 className="text-slate-800 mb-6 text-center text-xl sm:text-2xl font-semibold">
                {view === 'signup' && 'Create Account'}
                {view === 'signin' && 'Welcome Back'}
              </h3>
              {view === 'signup' && (
                <div className="flex justify-center mb-6 gap-3 flex-wrap sm:flex-nowrap">
                  <button
                    className={`px-6 py-2 border-2 cursor-pointer rounded-lg font-medium text-sm transition-all duration-200 shadow-sm w-full sm:w-auto ${signupType === 'admin' ? 'bg-blue-600 text-white border-blue-600 shadow-blue-600/25 -translate-y-0.5' : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:-translate-y-0.5'}`}
                    onClick={() => setSignupType('admin')}
                    type="button"
                  >
                    Admin
                  </button>
                  <button
                    className={`px-6 py-2 border-2 cursor-pointer rounded-lg font-medium text-sm transition-all duration-200 shadow-sm w-full sm:w-auto ${signupType === 'user' ? 'bg-blue-600 text-white border-blue-600 shadow-blue-600/25 -translate-y-0.5' : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:-translate-y-0.5'}`}
                    onClick={() => setSignupType('user')}
                    type="button"
                  >
                    User
                  </button>
                </div>
              )}
              <div>
                {view === 'signup' && (signupType === 'user' ? <SignUp /> : <AdminSignUp />)}
                {view === 'signin' && <SignIn />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
