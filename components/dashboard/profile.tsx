'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "@/types/types";
import { useAuthStore } from "@/store/auth";


export default function GetProfile () {
    const token = useAuthStore((state) => state.token)
    const [profile, setProfile] = useState<Profile>()
    const [msg,setMsg] = useState<string>()
    const [showMsg,setShowMsg] = useState<boolean>()

    useEffect(() => {
        async function details() {
            try{
                const res = await axios.get('http://127.0.0.1:5000/profile',{headers : { Authorization : `Bearer ${token}`}})
                if (res.status == 200){
                    setProfile(res.data)
                    setMsg("Success")
                    setShowMsg(false)
                }
            }catch(error){
                if(axios.isAxiosError(error)){
                    setMsg(error.message)
                    setShowMsg(true)
                }
            }
        }

        details()
    },[token])

    return(
        <section className="p-10 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{profile?.name}</h1>
                <p className="text-lg font-medium text-gray-600">{profile?.role}</p>
                <p className="text-base text-gray-500 font-mono">{profile?.email}</p>
                {showMsg && <p className="mt-6 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{msg}</p>}
            </div>
        </section>
    )
}