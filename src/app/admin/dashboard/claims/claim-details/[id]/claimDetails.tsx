"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendJSONData } from "@/tools/Toolkit";
import { useState } from "react";
import LoadingOverlay from "@/tools/./LoadingOverlay";


export default function claimDetails({ claims }: any) {
    const router = useRouter();

    const params = useParams<{ id: string }>();
    const id = params.id;
    const [loading, setLoading] = useState(false);

    let foundClaim: any = claims.find((item: any) => item.claimId === id);


    if (!foundClaim) {
        return <div>Claim not found</div>;
    }

    const updateStatus = async (status: string) => {

        setLoading(true);

        try {
            const result = await sendJSONData(`/api/admin/status/${id}`, {
                status
            }, "PUT");
            // console.log("Mongo URL:", MONGO_URL);
            if (result?.status === 200) {
                router.push("/admin/dashboard/claims");
                router.refresh();
            }


        } catch (error) {
            console.log("Update failed");
        } finally {
            setLoading(false);
        }


    }

    return (
        <>
            <LoadingOverlay show={loading} bgColor="rgba(3,80,116,0.8)" spinnerColor="#FFFFFF" />
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

                {foundClaim.status === "PENDING" && (
                    <div className="flex gap-4">
                        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => updateStatus("APPROVED")}>
                            Approve
                        </button>

                        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => updateStatus("REJECTED")}>
                            Reject
                        </button>
                    </div>
                )}
            </div>
        </>
    );

}

