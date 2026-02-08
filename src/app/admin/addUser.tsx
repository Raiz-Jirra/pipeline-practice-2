"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendJSONData } from "@/tools/Toolkit";

export default function AddEmployee() {
    const router = useRouter();
    const POST_URL = "/api/admin/user";

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const responseData = await sendJSONData(POST_URL, { firstName, lastName, email, password });

            if (!responseData) {
                alert("Network error. Please try again.");
            } else if (responseData.status === 400) {
                alert("Invalid input. Please check your fields.");
            } else if (responseData.status === 500) {
                alert("Server error. Please try again later.");
            } else if (responseData.status === 200) {
                alert("Employee created successfully");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                router.push("/");
            }

        } catch (error: any) {
            alert("Unexpected error: " + error.message);
        }


    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start lg:items-center justify-center px-6 py-8 md:py-12 lg:py-0">

            <div className="w-full max-w-3xl bg-white rounded shadow-md p-10">

                <form onSubmit={onSubmit}>
                    <h2 className="text-3xl font-semibold text-center mb-8">
                        Add Employee
                    </h2>

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
    );
};
