"use client";


import React from "react";
import { useState } from "react";
import Image from "next/image";
import { sendJSONData } from "@/tools/Toolkit";



export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const grantAccess = async () => {
        const result = await sendJSONData("/api/auth/login", {
            email,
            password
        });

        if (result?.data?.success) {
            alert("Access Granted");
            console.log("User Role:", result.data.role);
        } else {
            alert("Access Denied");
            console.log("Login failed");
        }
    };




    return (
        <div className="min-h-screen bg-gray-100 flex items-start lg:items-center justify-center px-6 py-8 md:py-12 lg:py-0">

            {/* WRAPPER */}
            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">

                {/* LOGIN CARD */}
                <form className="w-full lg:w-[60%] bg-amber-300 h-[448px] flex flex-col gap-6 p-10 rounded shadow-md">


                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Employee Login
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

                    <div className="flex flex-col gap-3 mt-4">
                        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="button" onClick={grantAccess}>
                            Login
                        </button>

                        <a href="#" className="text-sm text-center text-blue-500 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                </form>

                {/* IMAGE CARD */}
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
