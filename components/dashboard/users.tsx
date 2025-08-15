import { useAuthStore } from "@/store/auth";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "@/types/types";
import AssignRoleTable from "./assignRole";
import UsersGrid from "./usersGrid";

export default function Users () {
    const [admins, setAdmins] = useState<Profile []>([])
    const [managers, setManagers] = useState<Profile []>([])
    const [associates, setAssociates] = useState<Profile []>([])
    const [users,setUsers] = useState<Profile []>([])
    const token = useAuthStore((state) => state.token)

    const [view,setView] = useState<"Administrators" | "Managers" | "Associates" | "AssignRoles">("Managers")

    const fetchData = useCallback (async () => {
        if (!token) return
        async function fetchData () {
            try {
                const res = await axios.get("http://localhost:5005/admin",{ params: { token }})
                setAdmins(res.data.req_data[0])
                setManagers(res.data.req_data[1])
                setAssociates(res.data.req_data[2])
                setUsers(res.data.req_data[3])
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

    const handleSelection = (view : "Administrators" | "Managers" | "Associates" | "AssignRoles" ) => {
        setView(view)
    }

    return(
        <section className="space-y-8 p-6">
            <div className="flex justify-center">
                <nav className="inline-flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <button 
                    onClick={() =>{handleSelection("Administrators")}}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                        view === "Administrators" 
                            ? "bg-blue-500 text-white shadow-md" 
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                    }`}
                >
                    Administrators
                    </button>
                    <button 
                        onClick={() =>{handleSelection("Managers")}}
                        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                            view === "Managers" 
                                ? "bg-blue-500 text-white shadow-md" 
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                        }`}
                    >
                        Managers
                    </button>
                    <button 
                        onClick={() =>{handleSelection("Associates")}}
                        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                            view === "Associates" 
                                ? "bg-blue-500 text-white shadow-md" 
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                        }`}
                    >
                        Associates
                    </button>
                    <button 
                        onClick={() =>{handleSelection("AssignRoles")}}
                        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                            view === "AssignRoles" 
                                ? "bg-blue-500 text-white shadow-md" 
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                        }`}
                    >
                        Assign Roles
                    </button>
                </nav>
            </div>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <button
                        onClick={fetchData}
                        className="px-6 py-3 bg-blue-500 text-white border-none rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        Refresh
                    </button>
                </div>

                {view === "Administrators" &&
                    <div className="mb-8">
                        <UsersGrid 
                            title="Administrators" 
                            users={admins} 
                            showRole={true}
                            className="mb-6"
                        />
                    </div>
                }

                
                {view === "Managers" &&
                    <div className="mb-8">
                        <UsersGrid 
                            title="Managers" 
                            users={managers} 
                            showRole={true}
                            className="mb-6"
                        />
                    </div>
                }

                {view ===  "Associates" &&
                    <div className="mb-8">
                        <UsersGrid 
                            title="Associates" 
                            users={associates} 
                            showRole={true}
                            className="mb-6"
                        />
                    </div>
                }

                { view === "AssignRoles" && 
                    <div className="border-t pt-8">
                        <AssignRoleTable users={users}/>
                    </div>
                }
            </div>
        </section>
    )
}