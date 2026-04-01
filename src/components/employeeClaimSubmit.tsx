'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function EmployeeClaimSubmit({ employeeId, isAdmin }: { employeeId?: string; isAdmin?: boolean; }) {
    const [wyId, setWyId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        const userId = employeeId || localStorage.getItem('userId');
        if (!userId) {
            router.push('/employee/login');
        }
    }, [employeeId, router]);

    // Fetch user profile on component mount to pre-fill WY ID and phone number
    useEffect(() => {
        const fetchProfile = async () => {
            const userId = employeeId || localStorage.getItem('userId');
            if (userId) {
                const response = await fetch(`/api/employee/profile?userId=${userId}`);
                const data = await response.json();
                if (data.success && data.profile) {
                    setWyId(data.profile.wyId);
                    setPhoneNumber(data.profile.phoneNumber);
                }
            }
        };
        fetchProfile();
    }, [employeeId]);

    const isFormValid = () => {
        return wyId.trim() !== '' && phoneNumber.trim() !== '';
    };
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

            // Save phone and wyId in database
            const response = await fetch('/api/employee/updateProfile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    phoneNumber,
                    wyId
                })
            });

            const result = await response.json();

            if (result.success) {
                // Success! Navigate to next page
                router.push(`/admin/dashboard/claims/create/category?employeeId=${userId}&admin=${isAdmin ? "true" : "false"}`);

            } else {
                alert(`Failed to save information: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error saving information:', error);
            alert('Error saving information. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

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

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">Submit Your Claim!</h1>
                    <p className="text-gray-600">Please fill out the form below to submit a new claim</p>
                </div>

                {/* {employeeId && (
                    <p className="text-sm text-blue-600 mb-4">
                        Filing claim on behalf of employee ID: <strong>{employeeId}</strong>
                    </p>
                )} */}

                {/* Claim Submission Form */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6">Employee Information</h2>
                    <form>
                        <div className="flex gap-4 mb-4">

                            {/* WY ID Number */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">Weyland-Yutani ID</label>
                                <input type="text" value={wyId} onChange={(e) => setWyId(e.target.value)} placeholder="Example: WY-000" pattern="WY-\d{3}" title="Format: WY-### (e.g., WY-000)" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled />

                            </div>

                            {/* Phone Number */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">Phone Number</label>
                                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Example: 000-000-0000" pattern="\d{3}-\d{3}-\d{4}" title="Format: ###-###-#### (e.g., 555-123-4567)" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled />

                            </div>
                        </div>
                    </form>
                    <div className="flex justify-between items-center mt-6">
                        <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                            <Link href="/admin/dashboard/claims">
                                Cancel
                            </Link>
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!isFormValid() || submitting}
                            className={`px-6 py-3 rounded-lg transition-colors font-semibold ${isFormValid() && !submitting
                                ? 'bg-blue-500 text-white hover:bg-blue-700 cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {submitting ? 'Saving...' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}