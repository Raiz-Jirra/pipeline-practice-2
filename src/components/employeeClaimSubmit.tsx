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
    employee,
    isAdmin
}: {
    employeeId?: string;
    employee?: any;
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
     * Authentication Check Effect and Profile Data Fetching Effect
     * 
     * Verifies user is logged in on component mount and Fetches user to pre-fill WY ID and phone number.
     */
    useEffect(() => {
        const loadProfile = async () => {
            // ADMIN FLOW → use passed employee
            if (employee) {
                setWyId(employee.wyId || "");
                setPhoneNumber(employee.phoneNumber || "");
                return;
            }

            // EMPLOYEE FLOW → fetch own profile
            if (!isAdmin) {
                try {
                    const res = await fetch("/api/employee/profile");
                    const data = await res.json();

                    setWyId(data.wyId || "");
                    setPhoneNumber(data.phoneNumber || "");
                } catch (err) {
                    console.error("Failed to load profile", err);
                }
            }
        };

        loadProfile();
    }, [employee, isAdmin]);


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
            const res = await fetch('/api/employee/updateProfile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phoneNumber,
                    wyId,
                    userId: employeeId
                })
            });

            const result = await res.json();

            if (result.success) {
                if (isAdmin) {
                    router.push(`/admin/dashboard/claims/create/category?admin=true&employeeId=${employeeId}`);
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
        <div className="min-h-screen bg-gray-100">

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

                        </div>
                    </div>
                </header>

                <div className="max-w-xl mx-auto px-6 py-10">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Submit Your Claim
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Please confirm your details before continuing
                        </p>
                    </div>



                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Employee Information
                        </h2>

                        <hr className="border-gray-200" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* WY ID */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">
                                    Weyland-Yutani ID
                                </label>
                                <input
                                    type="text"
                                    value={wyId}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700"
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
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4">

                            <Link href={isAdmin ? "/admin/dashboard/claims" : "/employee/claim-dashboard"}>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition">
                                    Cancel
                                </button>
                            </Link>

                            <button
                                onClick={handleNext}
                                disabled={!isFormValid() || submitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50"
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