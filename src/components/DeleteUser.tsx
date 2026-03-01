"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendJSONData } from "@/tools/Toolkit";
import LoadingOverlay from "@/tools/LoadingOverlay";

export default function DeleteUser({ user }: any) {
    const router = useRouter();
    const DELETE_URL: string = `/api/admin/deleteUser/${user.id}`;

    const [loading, setLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    async function handleDelete() {
        setShowError(false);
        setSuccessMessage("");
        setLoading(true);

        try {
            const responseData = await sendJSONData(
                DELETE_URL,
                {},
                "DELETE"
            );

            if (!responseData) {
                setErrorMessage("Network error. Please try again.");
                setShowError(true);
            }
            else if (responseData.status === 500) {
                setErrorMessage("Server error. Please try again later.");
                setShowError(true);
            }
            else if (responseData.status === 400) {
                setErrorMessage("Invalid request.");
                setShowError(true);
            }
            else if (responseData.status === 200) {
                setSuccessMessage("User deleted successfully.");

                router.push("/admin/dashboard/users");
                router.refresh();
            }
            else {
                setErrorMessage("Failed to delete user.");
                setShowError(true);
            }

        } catch (err: any) {
            setErrorMessage("Unexpected error occurred.");
            setShowError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <LoadingOverlay show={loading} bgColor="rgba(3,80,116,0.8)" spinnerColor="#FFFFFF" />

            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
                <div className="max-w-lg w-full bg-white p-8 rounded shadow">

                    <h1 className="text-2xl font-bold mb-4 text-red-600">
                        Delete User
                    </h1>

                    {showError && (
                        <p className="text-red-500 mb-4">
                            {errorMessage}
                        </p>
                    )}

                    {successMessage && (
                        <p className="text-green-500 mb-4">
                            {successMessage}
                        </p>
                    )}

                    <p className="mb-6">
                        Are you sure you want to delete{" "}
                        <span className="font-bold text-red-600">
                            {user.firstName} {user.lastName}
                        </span>
                        's account? This action cannot be undone.
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Confirm Delete
                        </button>

                        <button
                            onClick={() =>
                                router.push("/admin/dashboard/users")
                            }
                            className="flex-1 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}