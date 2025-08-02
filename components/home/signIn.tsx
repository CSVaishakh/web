import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function SignIn () {
    const router = useRouter()

    const setToken = useAuthStore((state) => state.setToken)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [resMsg, setResMsg] = useState("")
    const [pop, setPop] = useState(false)

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://127.0.0.1:5000/signin',{ email,password })
            console.log(res.data)
            if (res.status == 200 && res.data.refresh_token){
                setToken(res.data.refresh_token)
                setResMsg("SignIn Successful")
                setPop(true)
                setTimeout(() => {
                    router.push('/dashboard')
                }, 1000)
            } else {
                setResMsg("SignIn failed - no token received")
                setPop(true)
            }
        }catch (error : unknown){
            if(axios.isAxiosError(error)){
                setResMsg(error.response?.data?.message || error.message)
                setPop(true)
            }
        }
        setTimeout(()=>{
            setPop(false)
        },3000)
    }

    return (
        <section>
            {pop && (
                <div>
                    {resMsg}
                </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
                <input 
                    className="form-input" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input 
                    className="form-input" 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button className="submit-button" type="submit">SignIn</button>
            </form>
        </section>
    )
}