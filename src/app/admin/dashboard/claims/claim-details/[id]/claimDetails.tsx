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
    const [showRejectBox, setShowRejectBox] = useState(false);
    const [comment, setComment] = useState("");


    let foundClaim: any = claims.find((item: any) => item.claimId === id);


    if (!foundClaim) {
        return <div>Claim not found</div>;
    }

    const updateStatus = async (status: string) => {

        setLoading(true);

        try {
            const payload: any = { status };

            if (status === "REJECTED") {
                payload.comment = comment;
            }
            const result = await sendJSONData(`/api/admin/status/${id}`, payload, "PUT");

            if (result?.status === 200) {
                setShowRejectBox(false);
                setComment("");
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
                    <p>
                        <strong>Employee:</strong> {foundClaim.firstName} {foundClaim.lastName}
                    </p>

                    {foundClaim.date && (
                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(foundClaim.date).toISOString().split("T")[0]}
                        </p>
                    )}

                    <p>
                        <strong>Category:</strong> {foundClaim.category}
                    </p>

                    <p>
                        <strong>Amount:</strong> ${foundClaim.amount}
                    </p>

                    <p>
                        <strong>Description:</strong> {foundClaim.description}
                    </p>

                    {foundClaim.imageUrls?.length > 0 && (
                        <div>
                            <strong>Receipts:</strong>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                {foundClaim.imageUrls.map((img: string, index: number) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt="Receipt"
                                        className="w-full h-32 object-cover rounded border"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {foundClaim.category === "TRAVEL" && foundClaim.travelDetails && (
                        <div>
                            <strong>Travel Details:</strong>
                            <p>From: {foundClaim.travelDetails.startLocation}</p>
                            <p>To: {foundClaim.travelDetails.endLocation}</p>
                            <p>Mileage: {foundClaim.travelDetails.estimatedMileage}</p>
                        </div>
                    )}

                    {foundClaim.category === "MEDICAL" && foundClaim.medicalDetails && (
                        <div>
                            <strong>Medical:</strong>
                            <p>
                                Facehugger Exposure:{" "}
                                {foundClaim.medicalDetails.specialExposure ? "Yes" : "No"}
                            </p>
                        </div>
                    )}

                    {/* Rejection Reason */}
                    {foundClaim.status === "REJECTED" && (
                        <p className="text-red-600 font-semibold">
                            <strong>Rejection Reason:</strong>{" "}
                            {foundClaim.comment || "No comment provided"}
                        </p>
                    )}

                    {/* Status Badge 🔥 */}
                    <p>
                        <strong>Status:</strong>{" "}
                        <span
                            className={`px-2 py-1 rounded text-sm font-semibold ${foundClaim.status === "APPROVED"
                                ? "bg-green-100 text-green-700"
                                : foundClaim.status === "REJECTED"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                        >
                            {foundClaim.status}
                        </span>
                    </p>

                </div>

                {foundClaim.status === "PENDING" && (
                    <div className="flex gap-4">
                        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => updateStatus("APPROVED")}>
                            Approve
                        </button>

                        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => setShowRejectBox(true)}>
                            Reject
                        </button>
                    </div>
                )}


                {showRejectBox && (
                    <div className="mt-4 bg-white p-4 rounded shadow space-y-3">
                        <h3 className="font-semibold">Rejection Comment</h3>

                        <textarea
                            className="w-full border p-2 rounded"
                            rows={4}
                            placeholder="Enter reason for rejection..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <div className="flex gap-3">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    setShowRejectBox(false);
                                    setComment("");
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded"
                                onClick={() => updateStatus("REJECTED")}
                                disabled={!comment.trim()}
                            >
                                Confirm Reject
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

}

