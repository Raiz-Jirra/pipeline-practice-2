/**
 * Employee Login Page
 * 
 * Authentication page for employees to access the claims system.
 * Validates credentials and redirects to employee dashboard on success.
 * 
 * Features:
 * - Email and password authentication
 * - Role-based access control (employees only)
 * - Link to admin login page
 * - Session management via localStorage
 * 
 * @author Robert Jones
 * @page /employee/login
 * @navigation Next: /employee/claim-dashboard (on successful login)
 */

"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { sendJSONData } from "@/tools/Toolkit";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Login Component
 * 
 * Employee login form with authentication and role validation.
 * 
 * @author Robert Jones
 * @component
 * @returns {JSX.Element} The employee login page
 */
export default function Login() {
    const router = useRouter();

    /** Employee's email address */
    const [email, setEmail] = useState<string>("");

    /** Employee's password */
    const [password, setPassword] = useState("");

    /**
     * Handle Login Authentication
     * 
     * Validates employee credentials and grants access to the claims system.
     * Stores user session data in localStorage and redirects to dashboard.
     * 
     * @author Robert Jones
     * @async
     * @function grantAccess
     * @returns {Promise<void>}
     */
    const grantAccess = async () => {
        const result = await sendJSONData("/api/login", { email, password });

        if (!result?.data?.success) {
            alert("Access Denied");
            return;
        }

        const role = result.data.role;

        if (role !== "EMPLOYEE") {
            await fetch("/api/logout", {
                method: "POST",
                credentials: "include"
            });

            alert("Access Denied: Employees only");
            return;
        }

        window.location.href = "/employee/claim-dashboard";
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <img src="/images/weyyuLogo.png" alt="Company Logo" width={120} height={120} />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Weyland-Yutani Corp</h1>
                            <p className="text-sm text-gray-600">HELLO</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center px-6 py-12 lg:py-20">
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
                    {/* Login Form */}
                    <div className="w-full lg:w-[55%]">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                                Employee Login
                            </h2>
                            <p className="text-gray-600 text-center mb-8">
                                Access your claims dashboard
                            </p>

                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); grantAccess(); }}>
                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Login Button */}
                                <button
                                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-medium"
                                    type="submit"
                                >
                                    Sign In
                                </button>

                                {/* Admin Login Link */}
                                <div className="text-center pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600 mb-2">Administrator?</p>
                                    <Link href="/admin/login">
                                        <button
                                            type="button"
                                            className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                                        >
                                            Admin Login
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Image Panel */}
                    <div className="hidden lg:block w-full lg:w-[45%]">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full min-h-[500px] overflow-hidden relative">
                            <Image
                                src="/images/weyland2.jpg"
                                alt="Login Illustration"
                                fill={true}
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
