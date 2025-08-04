'use client'

import React,{useState} from "react";
import axios from "axios";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function SignOut () {
    const token = useAuthStore((state)=>state.token)
    const router = useRouter()
    const [msg, setMsg] = useState("")
    const [pop,setPop] = useState(false)

    async function handleSignOut () {
        try{
            const res = await axios.post('http://127.0.0.1:5000/signout',null,{headers : { Authorization : `Bearer ${token}`}})
            if (res.status == 200){
                useAuthStore.getState().clearToken()
                setMsg("SignOut Successful")
                setPop(true)
                setTimeout(()=>{
                    router.push('/')
                })
            }
        }
        catch(error){
            if(axios.isAxiosError(error)){
                setMsg(error.message)
                setPop(true)
            }
        }
        setTimeout(()=>{
            setPop(false)
        },3000)
    }
    return(
        <section>
            <button className="px-6 py-3 bg-red-500 text-white border-none rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg" onClick={handleSignOut}>SignOut</button>
            {pop && (
                <div className="fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 font-medium bg-blue-50 border-2 border-blue-500 text-blue-800">
                    {msg}
                </div>
            )}
        </section>
    )
}