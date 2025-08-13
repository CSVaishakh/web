"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAuthStore } from "@/store/auth"
import type { Profile } from "@/types/types"

type RoleOption = "Admin" | "Manager" | "Associate"

const ROLE_OPTIONS: RoleOption[] = ["Admin", "Manager", "Associate"]

interface AssignRoleTableProps {
	users?: Profile[]
}

export default function AssignRoleTable({ users = [] }: AssignRoleTableProps) {
	const token = useAuthStore((s) => s.token)
	const [pendingRole, setPendingRole] = useState<Record<string, RoleOption>>({})
	const [rowBusy, setRowBusy] = useState<Record<string, boolean>>({})

	useEffect(() => {
		const initial: Record<string, RoleOption> = {}
		for (const u of users) initial[u.userid] = normalizeRole(u.role)
		setPendingRole(initial)
	}, [users])

	const hasToken = !!token

	function normalizeRole(role: string | null | undefined): RoleOption {
		const r = (role || "").toLowerCase()
		if (r.startsWith("admin")) return "Admin"
		if (r.startsWith("manager")) return "Manager"
				return "Associate"
	}

  async function updateRole(user: Profile) {
		if (!token) return
		const newRole = pendingRole[user.userid]
		if (!newRole) return
		setRowBusy((b) => ({ ...b, [user.userid]: true }))
		try {
			await axios.patch(
				`http://localhost:5005/admin?userId=${user.userid}&role=${newRole}`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
	} catch (e: unknown) {
			// Keep it simple – log the error
			console.error("Failed to update role", e)
	} finally {
			setRowBusy((b) => ({ ...b, [user.userid]: false }))
		}
	}

	return (
		<div className="w-full">
			<div className="mb-2 flex items-center justify-between">
				<h4 className="text-base font-semibold">Assign Roles</h4>
				{!hasToken && <span className="text-xs text-gray-500">Sign in to enable updates</span>}
			</div>

			<div className="overflow-x-auto rounded-md border">
				<table className="min-w-full text-left text-sm">
					<thead className="bg-gray-50 text-xs uppercase text-gray-600">
						<tr>
							<th className="px-4 py-3">Name</th>
							<th className="px-4 py-3">Email</th>
							<th className="px-4 py-3">Choose Role</th>
							<th className="px-4 py-3 text-right">Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map((u) => {
							const selected = pendingRole[u.userid] ?? "Associate"
							const busy = !!rowBusy[u.userid]
							return (
								<tr key={u.userid} className="border-t">
									<td className="px-4 py-3">
										<div className="font-medium text-gray-900">{u.name}</div>
										<div className="text-[11px] text-gray-500">{u.userid}</div>
									</td>
									<td className="px-4 py-3">{u.email}</td>
									<td className="px-4 py-3">
										<select
											className="w-40 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
											value={selected}
											onChange={(e) =>
												setPendingRole((pr) => ({ ...pr, [u.userid]: e.target.value as RoleOption }))
											}
											disabled={busy}
										>
											{ROLE_OPTIONS.map((opt) => (
												<option key={opt} value={opt}>
													{opt}
												</option>
											))}
										</select>
									</td>
									<td className="px-4 py-3 text-right">
										<button
											className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:bg-blue-300"
											onClick={() => updateRole(u)}
											disabled={busy || !hasToken}
										>
											{busy ? "Updating…" : "Update"}
										</button>
									</td>
								</tr>
							)
						})}
						{users.length === 0 && (
							<tr>
								<td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
									No users found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

