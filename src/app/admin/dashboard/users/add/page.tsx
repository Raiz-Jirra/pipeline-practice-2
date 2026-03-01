"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendJSONData } from "@/tools/Toolkit";
import LoadingOverlay from "@/tools/./LoadingOverlay";

export default function AddEmployee() {
    const router = useRouter();
    const POST_URL = "/api/admin/addUser";

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [dob, setDob] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const [loading, setLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            setErrorMessage("All required fields must be filled.");
            setShowError(true);
            return;
        }

        setShowError(false);
        setSuccessMessage("");
        setLoading(true);
        try {
            const responseData = await sendJSONData(POST_URL, { firstName, lastName, email, password, dob, street, city, province, postalCode, country });

            if (!responseData) {
                setErrorMessage("Network error. Please try again.");
                setShowError(true);
            } else if (responseData.status === 400) {
                setErrorMessage("Invalid input. Please check your fields.");
                setShowError(true);
            } else if (responseData.status === 500) {
                setErrorMessage("Server error. Please try again later.");
                setShowError(true);
            } else if (responseData.status === 200) {
                setSuccessMessage("Employee created successfully!");

                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setDob("");
                setStreet("");
                setCity("");
                setProvince("");
                setPostalCode("");
                setCountry("");

                router.push("/admin/dashboard/users");
                router.refresh();
            }
        } catch (error: any) {
            setErrorMessage("Unexpected error occurred.");
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay show={loading} bgColor="rgba(3,80,116,0.8)" spinnerColor="#FFFFFF" />

            <div className="min-h-screen bg-gray-100 flex items-start lg:items-center justify-center px-6 py-8 md:py-12 lg:py-0">

                <div className="w-full max-w-3xl bg-white rounded shadow-md p-10">

                    <form onSubmit={onSubmit}>
                        <h2 className="text-3xl font-semibold text-center mb-8">
                            Add Employee
                        </h2>

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


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>


                            <div>
                                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Street</label>
                                <input
                                    type="text"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">City</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Province</label>
                                <input
                                    type="text"
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Country</label>
                                <input
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                        </div>


                        <div className="flex gap-4 mt-10">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                Create Employee
                            </button>


                            <button
                                type="button"
                                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};
