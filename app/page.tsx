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
    <div className="main-container">
      <div className="content-wrapper">
        <div className="left-section">
          <div className="brand-section">
            <div className="logo-container">
              <Image src={'TaskStream.svg'} alt="TaskStream Logo" height={800} width={800}/>
            </div>
            <p className="tagline">A Single platform for Streamlining Tasks, Optimizing Management & Gathering Insights</p>
          </div>
        </div>
        
        <div className="right-section">
          <div className="auth-container">
            <div className="nav-section standalone-buttons">
                <button className={`nav-button ${signUp ? 'active' : ''}`} onClick={handleSignUp}>SignUp</button>
                <button className={`nav-button ${!signUp ? 'active' : ''}`} onClick={handleSignIn}>SignIn</button>
            </div>
            <div className="form-section">
              <h3 className="form-title">{signUp ? "Create Account" : "Welcome Back"}</h3>
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
