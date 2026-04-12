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


            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        Claim {foundClaim.claimId}
                    </h1>

                    <Link
                        href="/admin/dashboard/claims"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl shadow-md space-y-6 border border-gray-100">

                    <div>
                        <p className="text-gray-500 text-sm mb-1">Status</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${foundClaim.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : foundClaim.status === "REJECTED"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                            {foundClaim.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 text-sm">
                        <div>
                            <p className="text-gray-500">Employee</p>
                            <p className="font-semibold">{foundClaim.firstName} {foundClaim.lastName}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Date</p>
                            <p className="font-semibold">
                                {new Date(foundClaim.date).toISOString().split("T")[0]}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Category</p>
                            <p className="font-semibold">{foundClaim.category}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Amount</p>
                            <p className="font-semibold">${foundClaim.amount}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Description</p>
                        <p className="mt-1 text-gray-800">{foundClaim.description}</p>
                    </div>


                    {foundClaim.category === "TRAVEL" && foundClaim.travelDetails && (
                        <div className="bg-gray-50 p-4 rounded-xl border">
                            <h3 className="font-semibold mb-2">Travel Details</h3>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">From</p>
                                    <p>{foundClaim.travelDetails.startLocation}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">To</p>
                                    <p>{foundClaim.travelDetails.endLocation}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Mileage</p>
                                    <p>{foundClaim.travelDetails.estimatedMileage}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {foundClaim.category === "MEDICAL" && foundClaim.medicalDetails && (
                        <div className="bg-gray-50 p-4 rounded-xl border">
                            <h3 className="font-semibold mb-2">Medical Details</h3>
                            <p>
                                Exposure:{" "}
                                <span className="font-semibold">
                                    {foundClaim.medicalDetails.specialExposure ? "Yes" : "No"}
                                </span>
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



                    {foundClaim.imageUrls?.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2">Receipts</h3>

                            <div className="flex gap-4 flex-wrap">
                                {foundClaim.imageUrls.map((img: string, index: number) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt="Receipt"
                                        className="w-60 h-52 object-cover rounded-lg border hover:scale-105 transition"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {foundClaim.status === "PENDING" && (
                    <div className="flex justify-end gap-4">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold" onClick={() => updateStatus("APPROVED")}>
                            Approve
                        </button>

                        <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold" onClick={() => setShowRejectBox(true)}>
                            Reject
                        </button>

                    </div>
                )}


                {showRejectBox && (
                    <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded-lg shadow-sm space-y-3">
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

