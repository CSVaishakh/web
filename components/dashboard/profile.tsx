'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "@/types/types";
import { useAuthStore } from "@/store/auth";

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
            <section>
                <div>
                    <h1>{profile?.name}</h1>
                    <h3>Details</h3>
                    <p>{profile?.userid}</p>
                    <p>{profile?.email}</p>
                    <p>{profile?.created_at}</p>
                </div>
            </section>
    )
}