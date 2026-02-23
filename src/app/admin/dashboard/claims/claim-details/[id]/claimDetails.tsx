"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
export default function claimDetails({ claims }: any) {

    const params = useParams<{ id: string }>();
    const id = params.id;

    let foundClaim: any = claims.find((item: any) => item.claimId === id);


    if (!foundClaim) {
        return <div>Claim not found</div>;
    }

    return (
        <div className="space-y-6">
            <Link href="/admin/dashboard/claims" className="round-md bg-blue-600 text-white px-2 py-2 mb-2 rounded">
                Back to claims
            </Link>
            <h1 className="text-2xl font-bold mt-2">
                Reviewing {foundClaim.claimId}
            </h1>

            <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <p><strong>Employee:</strong> {foundClaim.firstName} {foundClaim.lastName}</p>
                <p><strong>Category:</strong> {foundClaim.category}</p>
                <p><strong>Amount:</strong> ${foundClaim.amount}</p>
                <p><strong>Description:</strong> {foundClaim.description}</p>
                <p><strong>Status:</strong> {foundClaim.status}</p>
            </div>

            <div className="flex gap-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded">
                    Approve
                </button>

                <button className="bg-red-600 text-white px-4 py-2 rounded">
                    Reject
                </button>
            </div>
        </div>
    );
}
