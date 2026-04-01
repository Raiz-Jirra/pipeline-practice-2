/**
 * Employee Claim Submit Page - Step 1: Employee Information
 * 
 * First step in the multi-step claim submission process.
 * Collects and validates employee's WY ID and phone number before
 * proceeding to claim category selection.
 * 
 * Features:
 * - Pre-fills user information from profile
 * - Validates required fields before proceeding
 * - Updates user profile with any changes
 * - Authentication check and redirect
 * 
 * @author Robert Jones
 * @page /employee/claim-submit
 * @requires User must be logged in with valid userId in localStorage
 * @navigation Next: /employee/claim-category
 */
'use client';

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
 * @author Robert Jones
 * @component
 * @returns {JSX.Element} The employee information form page
 */
export default function EmployeeClaimSubmit() {

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
 * Redirects to login page if no userId found in localStorage.
 * 
 * @author Robert Jones
 * @effect
 * @dependencies [router]
 */
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            router.push('/employee/login');
        }
    }, [router]);

    /**
 * Profile Data Fetching Effect
 * 
 * Fetches user profile on mount to pre-populate WY ID and phone number fields.
 * Improves UX by reducing manual data entry.
 * 
 * @author Robert Jones
 * @effect
 * @dependencies [] - Runs once on mount
 */
    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem('userId');
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
    }, []);

    /**
 * Form Validation Check
 * 
 * Validates that all required fields (WY ID and phone number) are filled out.
 * 
 * @author Robert Jones
 * @function isFormValid
 * @returns {boolean} True if form is valid and can be submitted
 */
    const isFormValid = () => {
        return wyId.trim() !== '' && phoneNumber.trim() !== '';
    };

    /**
 * Handle Next Button Click
 * 
 * Saves employee information to database and navigates to claim category page.
 * Performs validation, updates user profile, and handles errors.
 * 
 * @author Robert Jones
 * @async
 * @function handleNext
 * @returns {Promise<void>}
 */
    const handleNext = async () => {
        if (!isFormValid() || submitting) return;

        setSubmitting(true);

        try {
            const userId = localStorage.getItem('userId');
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
                router.push('/employee/claim-category');
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
        <div>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center gap-4">
                            <img src="/images/weyyuLogo.png" alt="Company Logo" width={120} height={120} />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Weyland-Yutani Corp</h1>
                                <p className="text-sm text-gray-600">Employee Claims Service</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-6 py-8">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Claim!</h2>
                        <p className="text-gray-600">Please fill out the form below to submit a new claim</p>
                    </div>

                    {/* Claim Submission Form */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">Employee Information</h3>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* WY ID Number */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Weyland-Yutani ID
                                    </label>
                                    <input
                                        type="text"
                                        value={wyId}
                                        onChange={(e) => setWyId(e.target.value)}
                                        placeholder="Example: WY-000"
                                        pattern="WY-\d{3}"
                                        title="Format: WY-### (e.g., WY-000)"
                                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Example: 000-000-0000"
                                        pattern="\d{3}-\d{3}-\d{4}"
                                        title="Format: ###-###-#### (e.g., 555-123-4567)"
                                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>
                        </form>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                            <Link href="/employee/claim-dashboard">
                                <button className="bg-gray-500 text-white px-6 py-2.5 rounded-md hover:bg-gray-600 transition font-medium">
                                    Back
                                </button>
                            </Link>
                            <button
                                onClick={handleNext}
                                disabled={!isFormValid() || submitting}
                                className={`px-6 py-2.5 rounded-md transition font-medium ${isFormValid() && !submitting ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {submitting ? 'Saving...' : 'Next'}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}