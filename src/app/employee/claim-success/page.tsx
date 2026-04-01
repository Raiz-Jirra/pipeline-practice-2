/**
 * Claim Success Page
 * 
 * Success confirmation page shown after employee successfully submits a claim.
 * Provides feedback and navigation back to the dashboard.
 * 
 * Features:
 * - Success message confirmation
 * - Link to return to claim dashboard
 * 
 * @author Robert Jones
 * @page /employee/claim-success
 * @navigation Previous: /employee/claim-category | Next: /employee/claim-dashboard
 */

import Link from "next/link";

/**
 * ClaimSent Component
 * 
 * Success page component that confirms claim submission.
 * 
 * @author Robert Jones
 * @component
 * @returns {JSX.Element} The success confirmation page
 */
export default function ClaimSent() {
    return (
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
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 max-w-lg w-full text-center">
                        {/* Success Icon */}
                        <div className="mb-6">
                            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Success Message */}
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Claim Submitted Successfully!
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Your claim has been submitted and is being reviewed. You can track the status of your claim from your dashboard.
                        </p>

                        {/* Home Button */}
                        <Link href="/employee/claim-dashboard">
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition font-medium">
                                Return to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}