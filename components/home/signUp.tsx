import React, { useState } from "react";
import axios from "axios";

export default function SignUp () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [roleCode,setRoleCode] = useState("")
    const [resMsg, setResMsg] = useState("")
    const [pop, setPop] = useState(false)

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://127.0.0.1:5000/signup',{ email,password,roleCode,name })
            console.log(res.data)
            setResMsg("SignUp Successful")
            setPop(true)
        }catch (error : unknown){
            if(axios.isAxiosError(error)){
                setResMsg(error.message)
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
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    required
                />
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
                <input 
                    className="form-input" 
                    type="text" 
                    placeholder="Role Code" 
                    value={roleCode} 
                    onChange={e => setRoleCode(e.target.value)}
                    required
                />
                <button className="submit-button" type="submit">SignUp</button>
            </form>
        </section>
    )
}