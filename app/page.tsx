'use client'

import React, { useState } from "react";
import Image from "next/image";
import SignUp from "@/components/home/signUp";
import SignIn from "@/components/home/signIn";

export default function Home() {
  const [signUp, setSignUp] = useState(true)
  
  const handleSignUp = () => {
    setSignUp(true)
  }

    const handleSignIn = () => {
    setSignUp(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl w-full items-center">
        <div className="flex flex-col justify-center p-8 order-2 lg:order-1">
          <div className="text-center lg:text-left">
            <div className="mb-6 flex justify-center lg:justify-start">
              <Image src={'TaskStream.svg'} alt="TaskStream Logo" height={800} width={800}/>
            </div>
            <p className="text-slate-600 text-xl leading-relaxed max-w-md mx-auto lg:mx-0">A Single platform for Streamlining Tasks, Optimizing Management & Gathering Insights</p>
          </div>
        </div>
        
        <div className="flex justify-center items-center order-1 lg:order-2">
          <div className="w-full max-w-md">
            <div className="flex gap-4 justify-center mb-8">
                <button className={`px-10 py-4 border-2 cursor-pointer rounded-xl font-semibold text-base transition-all duration-300 min-w-[140px] shadow-sm ${signUp ? 'bg-blue-600 text-white border-blue-600 shadow-blue-600/25 -translate-y-0.5' : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:-translate-y-0.5'}`} onClick={handleSignUp}>SignUp</button>
                <button className={`px-10 py-4 border-2 cursor-pointer rounded-xl font-semibold text-base transition-all duration-300 min-w-[140px] shadow-sm ${!signUp ? 'bg-blue-600 text-white border-blue-600 shadow-blue-600/25 -translate-y-0.5' : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:-translate-y-0.5'}`} onClick={handleSignIn}>SignIn</button>
            </div>
            <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 min-w-[400px]">
              <h3 className="text-slate-800 mb-6 text-center text-2xl font-semibold">{signUp ? "Create Account" : "Welcome Back"}</h3>
              <div>
                {signUp ? <SignUp/> : <SignIn/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
