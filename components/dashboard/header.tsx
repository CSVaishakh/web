'use client'

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export default function Header () {
    const token = useAuthStore((state)=>state.token)
    const router = useRouter()
    const [msg, setMsg] = useState("")
    const [pop,setPop] = useState(false)

    async function handleSignOut () {
        try{
            const res = await axios.post('http://127.0.0.1:5000/signout',null,{headers : { Authorization : `Bearer ${token}`}})
            if (res.status == 200){}
                setMsg("SignOut Successful")
                setPop(true)
                setTimeout(()=>{
                    router.push('/')
                })
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
            <Image src={'TaskSteam.svg'} alt="" height={20} width={20}/>
            <nav>
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>

                    </DropdownMenuContent>
                </DropdownMenu>
                <button onClick={handleSignOut}>SignOut</button>
            </nav>
            {pop && (
                <div>
                    {msg}
                </div>
            )}
        </section>
    )
}