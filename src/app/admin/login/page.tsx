"use client";


import React from "react";
import { useState } from "react";
import Image from "next/image";
import { sendJSONData } from "@/tools/Toolkit";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState("");

    const grantAccess = async () => {
        const result = await sendJSONData("/api/login", {
            email,
            password
        });

        if (!result?.data?.success) {
            alert("Access Denied");
            return;
        }

        const role = result.data.role;

        if (role === "ADMIN") {
            router.push("/admin/dashboard");
        } else if (!(role === "ADMIN")) {
            alert("Access Denied: You do not have admin privilages.")
        }
    };





    return (
        <div className="min-h-screen bg-gray-100 flex items-start lg:items-center justify-center px-6 py-8 md:py-12 lg:py-0">

            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">

                <form className="w-full lg:w-[60%] bg-amber-300 h-[448px] flex flex-col gap-6 p-10 rounded shadow-md">

                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Admin Login
                    </h2>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div className="flex flex-col gap-7 mt-4">
                        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="button" onClick={grantAccess}>
                            Login
                        </button>

                        <Link href="/employee/login/" className="bg-cyan-950 text-sm text-center text-blue-500 border rounded w-fit px-2 py-1">
                            Employee Login
                        </Link>
                    </div>

                </form>


                <div className="hidden md:flex w-full lg:w-[40%] bg-white h-[448px] items-center justify-center rounded shadow-md relative">
                    <Image
                        src="/images/weyland2.jpg"
                        alt="Login Illustration"
                        fill={true}
                        className="object-cover rounded"
                    />
                </div>

            </div>
        </div>
    );
}