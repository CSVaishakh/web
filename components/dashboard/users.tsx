import { useAuthStore } from "@/store/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "@/types/types";
import AssignRoleTable from "./assignRole";
import UsersGrid from "./usersGrid";

export default function Users () {
    const [managers, setManagers] = useState<Profile []>([])
    const [associates, setAssociates] = useState<Profile []>([])
    const [users,setUsers] = useState<Profile []>([])
    const token = useAuthStore((state) => state.token)
    useEffect(() => {
        if (!token) return
        async function fetchData () {
            try {
                const res = await axios.get("http://localhost:5005/admin",{ params: { token }})
                setAssociates(res.data.req_data[0])
                setManagers(res.data.req_data[1])
                setUsers(res.data.req_data[2])
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log(err.message)
                }
            }
        }
        fetchData()
    }, [token])

    return(
        <section className="space-y-8 p-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
                
                {/* Managers Section */}
                <div className="mb-8">
                    <UsersGrid 
                        title="Managers" 
                        users={managers} 
                        showRole={true}
                        className="mb-6"
                    />
                </div>

                {/* Associates Section */}
                <div className="mb-8">
                    <UsersGrid 
                        title="Associates" 
                        users={associates} 
                        showRole={true}
                        className="mb-6"
                    />
                </div>

                {/* Assign Roles Section */}
                <div className="border-t pt-8">
                    <AssignRoleTable users={users}/>
                </div>
            </div>
        </section>
    )
}