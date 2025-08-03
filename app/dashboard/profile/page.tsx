'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "@/types/types";
import { useAuthStore } from "@/store/auth";
import ProtectedRoute from "@/components/protectedRoute";

export default function GetProfile () {
    const token = useAuthStore((state) => state.token)
    const [profile, setProfile] = useState<Profile>()
    const [msg,setMsg] = useState<string>()

    useEffect(() => {
        async function details() {
            try{
                const res = await axios.get('http://127.0.0.1:5000/profile',{headers : { Authorization : `Bearer ${token}`}})
                if (res.status == 200){
                    setProfile(res.data)
                    setMsg("Success")
                }
            }catch(error){
                if(axios.isAxiosError(error)){
                    setMsg(error.message)
                }
            }
        }

        details()
    },[token])

    return(
        <ProtectedRoute>
            <section className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">{profile?.name}</h1>
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Details</h3>
                    <p className="text-gray-700 bg-gray-100 px-3 py-2 rounded mb-3 font-mono text-sm">{profile?.userid}</p>
                    <p className="text-gray-700 bg-gray-100 px-3 py-2 rounded mb-3">{profile?.email}</p>
                    <p className="text-gray-700 bg-gray-100 px-3 py-2 rounded">{profile?.created_at}</p>
                    <p className="text-sm mt-4 text-blue-600">{msg}</p>
                </div>
            </section>
        </ProtectedRoute>
    )
}