import React, { useState } from "react";
import axios from "axios";

export default function SignUp () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role] = useState("")
    const [license_key,setLicense_key] = useState("")
    const [resMsg, setResMsg] = useState("")
    const [pop, setPop] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://127.0.0.1:5000/admin-signup',{ email,password,role,name,license_key})
            console.log(res.data)
            setResMsg(res.data.message)
            setIsSuccess(true)
            setPop(true)
        }catch (error : unknown){
            if(axios.isAxiosError(error)){
                setResMsg(error.response?.data?.message || error.message || "Signup failed. Please try again.")
                setIsSuccess(false)
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
                <div className={`fixed top-4 right-4 left-4 md:left-auto p-4 rounded-lg shadow-lg z-50 animate-slide-in-right font-medium min-w-[200px] max-w-[350px] md:max-w-[350px] break-words ${
                    isSuccess 
                        ? 'bg-green-50 border-2 border-green-500 text-green-800' 
                        : 'bg-red-50 border-2 border-red-500 text-red-800'
                }`}>
                    {resMsg}
                </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <input 
                    className="p-4 border-2 border-slate-200 rounded-lg text-base transition-all duration-200 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] placeholder:text-slate-400" 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input 
                    className="p-4 border-2 border-slate-200 rounded-lg text-base transition-all duration-200 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] placeholder:text-slate-400" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input 
                    className="p-4 border-2 border-slate-200 rounded-lg text-base transition-all duration-200 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] placeholder:text-slate-400" 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <input 
                    className="p-4 border-2 border-slate-200 rounded-lg text-base transition-all duration-200 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] placeholder:text-slate-400" 
                    type="text" 
                    placeholder="License Key" 
                    value={license_key} 
                    onChange={e => setLicense_key(e.target.value)}
                    required
                />
                <button className="p-4 bg-blue-500 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)] active:translate-y-0" type="submit">SignUp</button>
            </form>
        </section>
    )
}