import { useAuthStore } from "@/store/auth";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "@/types/types";
import AssignRoleTable from "./assignRole";
import UsersGrid from "./usersGrid";

export default function Users () {
    const [managers, setManagers] = useState<Profile []>([])
    const [associates, setAssociates] = useState<Profile []>([])
    const [users,setUsers] = useState<Profile []>([])
    const token = useAuthStore((state) => state.token)

    const fetchData = useCallback (async () => {
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
    },[token])
    useEffect(() => {
        fetchData()
    }, [fetchData])

    return(
        <section className="space-y-8 p-6">
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <button
                        onClick={fetchData}
                        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Refresh
                    </button>
                </div>
                
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