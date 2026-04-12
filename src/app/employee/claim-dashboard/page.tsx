/**
 * Employee Claim Dashboard Page
 * 
 * This page displays an employee's claim history and status.
 * Features:
 * - View all submitted claims in a table format
 * - See claim status (approved, pending, rejected)
 * - Create new claims via navigation
 * - Logout functionality
 * - Authentication check and redirect
 * 
 * @author Robert Jones
 * @page /employee/claim-dashboard
 * @requires User must be logged in with valid userId in localStorage
 */

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/LoadingOverlay";

/**
 * Claim data structure representing an employee's expense claim
 * 
 * @author Robert Jones
 * @interface Claim
 * @property {string | number} id - Unique identifier for the claim
 * @property {string} date - Date the claim was submitted
 * @property {string} category - Type/category of the expense claim
 * @property {number} amount - Monetary amount of the claim
 * @property {string} status - Current status: "approved", "pending", or "rejected"
 * @property {string} description - Brief description of the claim
 */
interface Claim {
    id: string | number;
    date: string;
    category: string;
    amount: number;
    status: string;
    description: string;
}

/**
 * EmployeeClaimForm Component
 * 
 * Main dashboard component for employees to view and manage their claims.
 * Fetches user profile and claim data on mount, handles authentication,
 * and provides UI for claim management.
 * 
 * @author Robert Jones
 * @component
 * @returns {JSX.Element} The employee claim dashboard page
 */
export default function EmployeeClaimForm() {
    /** Array of all claims for the current user */
    const [claims, setClaims] = useState<Claim[]>([]);
    /** Loading state indicator for data fetching */
    const [loading, setLoading] = useState(true);
    /** Error message to display if data fetching fails */
    const [error, setError] = useState<string | null>(null);
    /** User's first name, defaults to 'User' */
    const [firstName, setFirstName] = useState<string>('User');
    /** User's last name, defaults to 'User' */
    const [lastName, setLastName] = useState<string>('User');
    const router = useRouter();

    /**
     * Data Fetching Effect
     * 
     * Runs on component mount to:
     * 1. Check user authentication (redirect to login if not authenticated)
     * 2. Fetch user profile data
     * 3. Fetch user's claims data
     * 
     * Uses Promise.all for parallel data fetching to improve performance.
     * 
     * @author Robert Jones
     * @effect
     * @dependencies [router] - Re-runs if router instance changes
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch user profile and claims in parallel
                const [profileRes, claimsRes] = await Promise.all([
                    fetch("/api/employee/profile"),
                    fetch("/api/employee/claims")
                ]);

                if (profileRes.status === 401 || claimsRes.status === 401) {
                    router.push("/employee/login");
                    return;
                }

                const profileData = await profileRes.json();
                const claimsData = await claimsRes.json();

                if (profileData.success) {
                    setFirstName(profileData.profile.firstName);
                    setLastName(profileData.profile.lastName);
                }

                if (claimsData.success) {
                    setClaims(claimsData.claims);
                } else {
                    setError("Failed to load claims");
                }

            } catch (err) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    /**
     * Get Status Color
     * 
     * Returns Tailwind CSS classes for styling claim status badges
     * based on the claim's current status.
     * 
     * @author Robert Jones
     * @function getStatusColor
     * @param {string} status - The claim status ("approved", "pending", "rejected")
     * @returns {string} Tailwind CSS classes for background and text color
     */
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

    /**
     * Handle Logout
     * 
     * Clears user session data from localStorage and redirects
     * to the employee login page.
     * 
     * @author Robert Jones
     * @function handleLogout
     * @returns {void}
     */
    const handleLogout = async () => {
        await fetch("/api/employee/logout", { method: "POST" });
        router.push("/employee/login");
    };
    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8">
                    <div className="text-center">
                        <div className="text-red-600 text-5xl mb-4"></div>
                        <p className="text-red-600 font-semibold text-lg">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <LoadingOverlay show={loading} bgColor="rgba(17, 24, 39, 0.8)" spinnerColor="#3B82F6" />
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src="/images/weyyuLogo.png" alt="Company Logo" width={120} height={120} />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Weyland-Yutani Corp</h1>
                                    <p className="text-sm text-gray-600">Employee Claims Service</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition font-medium"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-6 py-8">
                    {/* Welcome Section */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hello, {firstName} {lastName}!</h2>
                        <p className="text-gray-600">View your claim status and history</p>
                    </div>

                    {/* Claim Status & History Section */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Claim Status & History</h3>
                                <Link href="/employee/claim-submit">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium">
                                        Create New Claim
                                    </button>
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                                        <tr>
                                            <th className="px-6 py-4">Claim ID</th>
                                            <th className="px-6 py-4">Category</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Description</th>
                                            <th className="px-6 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claims.map((claim) => (
                                            <tr key={claim.id} className="border-t hover:bg-slate-50 transition">
                                                <td className="px-6 py-4 font-medium text-gray-900">{claim.id}</td>
                                                <td className="px-6 py-4 text-gray-700">{claim.category}</td>
                                                <td className="px-6 py-4 text-gray-700">{claim.date}</td>
                                                <td className="px-6 py-4 font-semibold text-gray-900">${claim.amount.toFixed(2)}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>
                                                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">{claim.description}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <Link href={`/employee/claim-details/${claim.id}`}>
                                                            <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition text-xs font-medium">
                                                                Details
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Empty state (for when there are no claims) */}
                            {claims.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No claims found</p>
                                    <p className="text-gray-400 text-sm mt-2">Get started by creating your first claim</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}