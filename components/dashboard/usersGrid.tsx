"use client"

import React from "react"
import type { Profile } from "@/types/types"

interface UsersGridProps {
	title: string
	users: Profile[]
	showRole?: boolean
	className?: string
}

export default function UsersGrid({ 
	title, 
	users, 
	showRole = true, 
	className = "" 
}: UsersGridProps) {
	return (
		<div className={`w-full ${className}`}>
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
				<span className="text-sm text-gray-500">
					{users.length} {users.length === 1 ? 'user' : 'users'}
				</span>
			</div>

			<div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
				<table className="min-w-full text-left text-sm">
					<thead className="bg-gray-50 text-xs uppercase text-gray-700">
						<tr>
							<th className="px-6 py-3 font-medium">Name</th>
							<th className="px-6 py-3 font-medium">User ID</th>
							<th className="px-6 py-3 font-medium">Email</th>
							{showRole && (
								<th className="px-6 py-3 font-medium">Role</th>
							)}
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{users.map((user) => (
							<tr key={user.userid} className="hover:bg-gray-50 transition-colors">
								<td className="px-6 py-4">
									<div className="font-medium text-gray-900">{user.name}</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-gray-600 font-mono text-xs">
										{user.userid}
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-gray-600">{user.email}</div>
								</td>
								{showRole && (
									<td className="px-6 py-4">
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
											{user.role || 'Associate'}
										</span>
									</td>
								)}
							</tr>
						))}
						{users.length === 0 && (
							<tr>
								<td 
									className="px-6 py-8 text-center text-gray-500" 
									colSpan={showRole ? 4 : 3}
								>
									<div className="flex flex-col items-center">
										<svg 
											className="w-8 h-8 text-gray-400 mb-2" 
											fill="none" 
											stroke="currentColor" 
											viewBox="0 0 24 24"
										>
											<path 
												strokeLinecap="round" 
												strokeLinejoin="round" 
												strokeWidth={2} 
												d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" 
											/>
										</svg>
										<span>No {title.toLowerCase()} found.</span>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}