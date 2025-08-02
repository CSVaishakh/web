'use client'

import ProtectedRoute from "@/components/protectRoute";
import SignOut from "@/components/signOut";
import { useAuthStore } from "@/store/auth";
import React from "react";

export default function Dashboard () {
    const token = useAuthStore((state) => state.token);
    console.log(token)
    
    if (token != null){
        
        return(
        <section>
                <h1>Unauthorized</h1>
        </section>
    )
return(
            <section>
                <h1>Dashboard</h1>
            </section>
        )
    }
    


}