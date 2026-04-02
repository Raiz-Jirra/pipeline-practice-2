"use client";

/**
 * Employee Claim Submit Page - Step 1: Employee Information
 * 
 * First step in the multi-step claim submission process.
 * Collects and validates employee's WY ID and phone number before
 * proceeding to claim category selection.
 * 
 * Features:
 * - Pre-fills user information from profile
 * - Supports admin submitting on behalf of employee
 * - Validates required fields before proceeding
 * - Updates user profile with any changes
 * - Authentication check and redirect
 * 
 * @author Robert Jones
 * @page /employee/claim-submit
 * @navigation Next: /employee/claim-category
 */

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

/**
 * EmployeeClaimSubmit Component
 * 
 * First step form component for claim submission workflow.
 * Collects employee identification information (WY ID and phone number)
 * and validates before allowing progression to category selection.
 * 
 * Supports:
 * - Employee flow (self submission)
 * - Admin flow (select employee first)
 * 
 * @author Robert Jones
 * @component
 * @param {string} [employeeId] - Optional employee ID (admin flow)
 * @param {boolean} [isAdmin] - Indicates admin mode
 * @returns {JSX.Element}
 */
export default function EmployeeClaimSubmit({
    employeeId,
    isAdmin
}: {
    employeeId?: string;
    isAdmin?: boolean;
}) {

    /** Employee's Weyland-Yutani ID (format: WY-###) */
    const [wyId, setWyId] = useState('');

    /** Employee's phone number (format: ###-###-####) */
    const [phoneNumber, setPhoneNumber] = useState('');

    /** Indicates if form submission is in progress */
    const [submitting, setSubmitting] = useState(false);

    const router = useRouter();

    /**
     * Authentication Check Effect
     * 
     * Verifies user is logged in on component mount.
     */
    useEffect(() => {
        const userId = employeeId || localStorage.getItem('userId');

        if (!userId) {
            router.push('/employee/login');
        }
    }, [employeeId, router]);

    /**
     * Profile Data Fetching Effect
     * 
     * Fetches user profile to pre-fill WY ID and phone number.
     */
    useEffect(() => {
        const fetchProfile = async () => {
            const userId = employeeId || localStorage.getItem('userId');

            if (userId) {
                const res = await fetch(`/api/employee/profile?userId=${userId}`);
                const data = await res.json();

                if (data.success && data.profile) {
                    setWyId(data.profile.wyId);
                    setPhoneNumber(data.profile.phoneNumber);
                }
            }
        };

        fetchProfile();
    }, [employeeId]);

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
    const handleLogout = () => {
        localStorage.removeItem('userId');
        router.push('/employee/login');
    };

    /**
     * Form Validation Check
     * 
     * Ensures WY ID and phone number are present.
     * 
     * @returns {boolean}
     */
    const isFormValid = () => {
        return wyId.trim() !== '' && phoneNumber.trim() !== '';
    };

    /**
     * Handle Next Button Click
     * 
     * Saves employee info and routes to next step.
     * 
     * - Updates profile in database
     * - Redirects based on admin/employee flow
     * 
     * @async
     * @function handleNext
     * @returns {Promise<void>}
     */
    const handleNext = async () => {
        if (!isFormValid() || submitting) return;

        setSubmitting(true);

        try {
            const userId = employeeId || localStorage.getItem('userId');

            if (!userId) {
                alert('Please log in to continue');
                router.push('/employee/login');
                return;
            }

            const res = await fetch('/api/employee/updateProfile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    phoneNumber,
                    wyId
                })
            });

            const result = await res.json();

            if (result.success) {

                if (isAdmin) {
                    router.push(`/admin/dashboard/claims/create/category?employeeId=${userId}&admin=true`);
                } else {
                    router.push('/employee/claim-category');
                }

            } else {
                alert(result.error || 'Failed to save information');
            }

        } catch (err) {
            console.error(err);
            alert('Error saving information');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-6xl">

            {/* Header */}
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

                <div className="max-w-3xl mx-auto">

                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">Submit Your Claim!</h1>
                        <p className="text-gray-600">Please fill out the form below</p>
                    </div>



                    <div className="bg-white rounded-lg shadow p-6">

                        <h2 className="text-xl font-semibold mb-6">
                            Employee Information
                        </h2>

                        <div className="flex gap-4 mb-4">

                            {/* WY ID */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">
                                    Weyland-Yutani ID
                                </label>
                                <input
                                    type="text"
                                    value={wyId}
                                    className="w-full border rounded px-4 py-2"
                                    disabled
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    className="w-full border rounded px-4 py-2"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="flex justify-between mt-6">

                            <Link href={isAdmin ? "/admin/dashboard/claims" : "/employee/claim-dashboard"}>
                                <button className="bg-gray-500 text-white px-6 py-3 rounded-lg">
                                    Cancel
                                </button>
                            </Link>

                            <button
                                onClick={handleNext}
                                disabled={!isFormValid() || submitting}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                            >
                                {submitting ? 'Saving...' : 'Next'}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}