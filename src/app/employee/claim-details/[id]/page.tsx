"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EmployeeClaimDetails() {
    const params = useParams<{ id: string }>();
    const id = params.id;

    const [claim, setClaim] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClaim = async () => {
            try {
                const res = await fetch(`/api/employee/claims`, {
                    credentials: "include"
                });

                if (res.status === 401) {
                    window.location.href = "/employee/login";
                    return;
                }

                const data = await res.json();

                if (data.success) {
                    const found = data.claims.find((c: any) => c.id === id);
                    setClaim(found);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClaim();
    }, [id]);


    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (loading) return null;

    if (!claim) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Claim not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="/images/weyyuLogo.png" width={120} />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Weyland-Yutani Corp
                            </h1>
                            <p className="text-sm text-gray-600">
                                Employee Claims Service
                            </p>
                        </div>
                    </div>

                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-10">

                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        {claim.id} Details
                    </h2>

                    <Link href="/employee/claim-dashboard">
                        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition text-white">
                            Back to Dashboard
                        </button>
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">

                    <div className="grid grid-cols-2 gap-6 text-sm">

                        <div>
                            <p className="text-gray-500">Date</p>
                            <p className="font-semibold">{claim.date}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Category</p>
                            <p className="font-semibold">{claim.category}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Amount</p>
                            <p className="font-semibold text-gray-900">
                                ${claim.amount}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Status</p>
                            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold inline-block mt-1 ${getStatusColor(claim.status)}`}>
                                {claim.status}
                            </span>
                        </div>

                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Description</p>
                        <p className="mt-1 text-gray-800">{claim.description}</p>
                    </div>


                    {claim.receipts && claim.receipts.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2">Receipts</h3>

                            <div className="flex flex-wrap gap-4">
                                {claim.receipts.map((file: string, index: number) => (
                                    <img
                                        key={index}
                                        src={`/uploads/${file}`}
                                        alt="Receipt"
                                        className="w-60 h-52 object-cover rounded-lg border hover:scale-105 transition"
                                        onError={(e) => {
                                            e.currentTarget.src = "/images/placeholder.png";
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <hr className="border-gray-200" />

                    {claim.status === "rejected" && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <strong className="text-red-700">Rejection Reason:</strong>
                            <p className="text-red-600 mt-1">
                                {claim.comment || "No comment provided"}
                            </p>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}