"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


interface Claim {
    id: string | number;
    date: string;
    category: string;
    amount: number;
    status: string;
    description: string;
}

export default function EmployeeClaimForm() {
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string>('User');
    const [lastName, setLastName] = useState<string>('User');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Check if user is logged in
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    router.push('/employee/login');
                    return;
                }

                // Fetch user profile and claims in parallel
                const [profileResponse, claimsResponse] = await Promise.all([
                    fetch(`/api/employee/profile?userId=${userId}`),
                    fetch(`/api/employee/claims?userId=${userId}`)
                ]);

                const profileData = await profileResponse.json();
                const claimsData = await claimsResponse.json();

                // Set first name
                if (profileData.success) {
                    setFirstName(profileData.profile.firstName);
                }

                // Set last name
                if (profileData.success) {
                    setLastName(profileData.profile.lastName);
                }

                // Set claims
                if (claimsData.success) {
                    setClaims(claimsData.claims);
                } else {
                    setError('Failed to load claims');
                }
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto p-6 max-w-6xl">
                <div className="text-center py-8">
                    <p>Loading claims...</p>
                </div>
            </div>
        );
    }

    // Error state  
    if (error) {
        return (
            <div className="container mx-auto p-6 max-w-6xl">
                <div className="text-center py-8 text-red-500">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

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
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Hello, {firstName} {lastName}!</h1>
                <p className="text-gray-600">View your claim status and history</p>
            </div>

            {/* Claim Status & History Section */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Claim Status & History</h2>
                    <button className="bg-blue-500 text-white py-2 px-2 hover:bg-blue-800">
                        <Link href="/employee/claim-submit">
                            Create New Claim
                        </Link>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b"><th className="text-left p-3 font-semibold">Claim ID</th><th className="text-left p-3 font-semibold">Category</th><th className="text-left p-3 font-semibold">Date</th><th className="text-left p-3 font-semibold">Amount</th><th className="text-left p-3 font-semibold">Status</th><th className="text-left p-3 font-semibold">Description</th><th className="text-left p-3 font-semibold">Actions</th></tr>
                        </thead>
                        <tbody>
                            {claims.map((claim) => (
                                <tr key={claim.id} className="border-b hover:bg-gray-50"><td className="p-3">{claim.id}</td><td className="p-3">{claim.category}</td><td className="p-3">{claim.date}</td><td className="p-3">${claim.amount.toFixed(2)}</td><td className="p-3"><span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>{claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}</span></td><td className="p-3">{claim.description}</td><td className="p-3"><div className="flex gap-2"><button className="bg-blue-700 text-white py-2 px-2 hover:bg-blue-900">View JPEG</button><button className="bg-red-700 text-white py-2 px-2 hover:bg-red-900">View PDF</button></div></td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty state (for when there are no claims) */}
                {claims.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <p>No claims found</p>
                    </div>
                )}
            </div>
        </div>
    );
}