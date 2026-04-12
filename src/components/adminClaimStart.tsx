"use client";

import { useState } from "react";
import EmployeeClaimSubmit from "@/components/employeeClaimSubmit";
import Link from "next/link";

export default function CreateClaim({ users }: { users: any[] }) {
    const [selectedUser, setSelectedUser] = useState<any>(null);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <h1 className="text-3xl font-bold">Claims</h1>


                {/* <Link href="/employee/claim-submit"> */}
                <Link href="/admin/dashboard/claims">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        Back to claims
                    </button>
                </Link>
            </div>

            <div className="bg-white p-6 rounded shadow">
                <label className="block mb-2 font-medium">
                    Select Employee
                </label>

                <select
                    value={selectedUser?.id || ""}
                    onChange={(e) => {
                        const user = users.find(u => u.id === e.target.value);
                        setSelectedUser(user);
                    }}
                    className="border p-2 rounded w-full"
                >
                    <option value={""}>-- Choose Employee --</option>

                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName}
                        </option>
                    ))}
                </select>
            </div>

            {selectedUser && (
                <div className="bg-white p-6 rounded shadow">
                    <EmployeeClaimSubmit
                        key={selectedUser.id} // 
                        employeeId={selectedUser.id}
                        employee={selectedUser}
                        isAdmin={true}
                    />
                </div>
            )}
        </div>
    );
}