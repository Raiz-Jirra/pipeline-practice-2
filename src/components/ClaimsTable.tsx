"use client";

import { useState } from "react";
import Link from "next/link";

export default function ClaimsTable({ claims }: { claims: any[] }) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const filteredClaims = claims.filter((claim) => {
        const matchesSearch =
            claim.claimId.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            status === "All" || claim.status === status;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "APPROVED":
                return "bg-green-100 text-green-800";
            case "PENDING":
                return "bg-yellow-100 text-yellow-800";
            case "REJECTED":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between bg-white p-4 rounded-lg shadow">
                <input
                    type="text"
                    placeholder="Search by claim ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="All">All</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Claim ID</th>
                            <th className="px-6 py-4">Employee Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>

                        </tr>
                    </thead>

                    <tbody>
                        {filteredClaims.map((claim) => (

                            <tr
                                key={claim.claimId}
                                className="border-t hover:bg-slate-50 transition"
                            >
                                <td className="px-6 py-4 font-medium">
                                    {claim.claimId}
                                </td>

                                <td className="px-6 py-4 font-medium">
                                    {claim.firstName} {claim.lastName}
                                </td>

                                <td className="px-6 py-4">
                                    {claim.category}
                                </td>

                                <td className="px-6 py-4 font-semibold">
                                    ${claim.amount.toFixed(2)}
                                </td>

                                <td className="px-6 py-4">
                                    {new Date(claim.date).toISOString().split("T")[0]}
                                </td>


                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>{claim.status}</span>
                                </td>

                                <td className="px-6 py-4">
                                    <Link
                                        href={`/admin/dashboard/claims/claim-details/${claim.claimId}`}
                                        className="text-white py-2 px-2 hover:text-blue-800 font-medium rounded-md bg-blue-600"
                                    >
                                        Review
                                    </Link>
                                </td>

                            </tr>
                        ))}

                        {filteredClaims.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="text-center py-8 text-slate-500"
                                >
                                    No claims found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
