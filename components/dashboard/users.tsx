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
    const [allUsers, setAllUsers] = useState<Profile []>([])
    const token = useAuthStore((state) => state.token)

    const [view,setView] = useState<"All Users" | "Administrators" | "Managers" | "Associates" | "AssignRoles">("Managers")
    const [editingUser, setEditingUser] = useState<Profile | null>(null)
    const [selectedRole, setSelectedRole] = useState<string>("")
    const [isUpdating, setIsUpdating] = useState(false)

    const handleEditRole = (user: Profile) => {
        setEditingUser(user)
        setSelectedRole(user.role || "Associate")
    }

    const handleRoleUpdate = async () => {
        if (!editingUser || !token || !selectedRole) return
        
        setIsUpdating(true)
        console.log("Updating role for user:", editingUser.userid, "to role:", selectedRole)
        try {
            await axios.patch(
                `http://localhost:5005/admin?userId=${editingUser.userid}&newRole=${selectedRole}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
            console.log("Role update successful")
            // Refresh data after successful update
            await fetchData()
            setEditingUser(null)
            setSelectedRole("")
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Failed to update role:", err.message)
                console.error("Response data:", err.response?.data)
                console.error("Response status:", err.response?.status)
                // You could show a toast notification here
            } else {
                console.error("Unexpected error:", err)
            }
        } finally {
            setIsUpdating(false)
        }
    }

    const handleCancelEdit = () => {
        setEditingUser(null)
        setSelectedRole("")
    }

    const fetchData = useCallback (async () => {
        if (!token) return
        console.log("Fetching data...")
        async function fetchData () {
            try {
                const res = await axios.get("http://localhost:5005/admin",{ params: { token }})
                console.log("Fetched data:", res.data.req_data)
                setAdmins(res.data.req_data[0])
                setManagers(res.data.req_data[1])
                setAssociates(res.data.req_data[2])
                setUsers(res.data.req_data[3])
                setAllUsers(res.data.req_data.flat())
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

    const handleSelection = (view : "All Users" | "Administrators" | "Managers" | "Associates" | "AssignRoles" ) => {
        setView(view)
    }

    return(
        <section className="space-y-8 p-6">
            <div className="flex justify-center">
                <nav className="inline-flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <button 
                        onClick={() =>{handleSelection("All Users")}}
                        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                            view === "All Users" 
                                ? "bg-blue-500 text-white shadow-md" 
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                        }`}
                    >
                    All Users
                    </button>
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

                {view === "All Users" &&
                    <div className="mb-8">
                        <UsersGrid 
                            title="All Users" 
                            users={allUsers} 
                            showRole={true}
                            showEditRole={true}
                            onEditRole={handleEditRole}
                            className="mb-6"
                        />
                    </div>
                }

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

            {/* Role Edit Modal */}
            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Edit Role for {editingUser.name}
                        </h3>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Role
                            </label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={isUpdating}
                            >
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Associate">Associate</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleCancelEdit}
                                className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                                disabled={isUpdating}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRoleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                                disabled={isUpdating || !selectedRole}
                            >
                                {isUpdating ? "Updating..." : "Update Role"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}