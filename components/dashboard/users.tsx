import { useAuthStore } from "@/store/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "@/types/types";
import AssignRoleTable from "./assignRole";

export default function Users () {
    const [managers, setManagers] = useState<Profile []>([])
    const [associates, setAssociates] = useState<Profile []>([])
    const [users,setUsers] = useState<Profile []>([])
    const token = useAuthStore((state) => state.token)
    useEffect(() => {
        if (!token) return
        let cancelled = false
        async function fetchData () {
            try {
                const res = await axios.get("http://localhost:5005/admin",{ params: { token }})
                if (cancelled) return
                setAssociates(res.data.req_data[0])
                setManagers(res.data.req_data[1])
                setUsers(res.data.req_data[2])
            } catch (err) {
                console.error("Failed to load users:", err)
            }
        }
        fetchData()
        return () => { cancelled = true }
    }, [token])

    return(
        <section>
            <div>
                <h1>Dashboard</h1>
                <div>
                    <h3>Managers</h3>
                    <ul>
                        {managers.map(manager => (
                            <li key={manager.userid}>
                                <div>
                                    <h5>{manager.name}</h5>
                                    <p>{manager.userid}</p>
                                    <p>{manager.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Associates</h3>
                    <ul>
                        {associates.map(associate => (
                            <li key={associate.userid}>
                                <div>
                                    <h5>{associate.name}</h5>
                                    <p>{associate.userid}</p>
                                    <p>{associate.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Assign Roles</h3>
                    <AssignRoleTable users={ users }/>
                </div>
            </div>
        </section>
    )
}