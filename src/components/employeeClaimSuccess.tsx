"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ClaimSent() {
    const params = useSearchParams();
    const isAdmin = params.get("admin") === "true";

    const homeRoute = isAdmin
        ? "/admin/dashboard/claims"
        : "/employee/claim-dashboard";


    return (
        <div className="container mx-auto p-6 max-w-6xl">
            {/* Header */}
            <header>
                <div className="flex items-center gap-4 mb-6">
                    <img src="/images/weyyuLogo.png" alt="Company Logo" width={150} height={150} />
                    <div className="text-3xl font-bold">
                        Welcome to Weyland-Yutani's Employee Claims Service
                    </div>
                </div>
            </header>

            <div className="flex flex-col items-center justify-center text-center mb-6 mt-12">
                <p className="text-gray-600 mb-6">
                    Your claim has been submitted successfully.
                </p>

                <Link href={homeRoute}>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        {isAdmin ? "Back to Claims" : "Home"}
                    </button>
                </Link>
            </div>
        </div>

    );
}