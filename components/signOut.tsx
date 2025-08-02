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
                console.log(token)
                setPop(true)
            }
        }
        setTimeout(()=>{
            setPop(false)
        },3000)
    }
    return(
        <section>
            <button onClick={handleSignOut}>SignOut</button>
            {pop && (
                <div>
                    {msg}
                </div>
            )}
        </section>
    )
}