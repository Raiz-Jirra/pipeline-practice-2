import Link from "next/link";

export default function EmployeeClaimSubmit() {


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

                {/* Claim Submission Form */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6">Employee Information</h2>

                    <form>
                        <div className="flex gap-4 mb-4">
                            {/* First Name */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">First Name</label>
                                <input
                                    type="text" placeholder="Enter your first name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            {/* Last Name */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">Last Name</label>
                                <input type="text" placeholder="Enter your last name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div className="flex gap-4 mb-4">

                            {/* WY ID Number */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">Weyland-Yutani ID</label>
                                <input type="text" placeholder="Enter your WY ID Number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            {/* Date of Birth */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">Date of Birth</label>
                                <input type="text" placeholder="Enter your date of birth" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div className="flex gap-4 mb-4">
                            {/* Email Address */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">Email Address</label>
                                <input type="emial" placeholder="Enter your email address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            {/* Phone Number */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">Phone Number</label>
                                <input type="tel" placeholder="Enter your phone number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                        </div>

                        <div className="flex gap-4 mb-4">
                            {/* Address */}
                            <div className="flex-1">
                                <label className="block font-semibold mb-2">Address</label>
                                <input type="text" placeholder="Enter your address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-between items-center mt-6">
                        <Link href="/employee/claim-form">
                            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                                Back
                            </button>
                        </Link>
                        <Link href="/employee/claim-category">
                            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                                Continue
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}