import Link from 'next/link';

export default function ClaimCatagory() {


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

                {/* Claim Catagory */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6">Claim Information</h2>

                    {/* Select Category */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Category</label>
                        <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select a category</option>
                            <option value="option1">Food</option>
                            <option value="option2">Travel</option>
                            <option value="option3">Lodging</option>
                            <option value="option3">Medical</option>
                        </select>
                    </div>

                    {/* Special Category checkbox */}
                    <div className="mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>Facehugger Exposure (If Medical is selected)</span>
                        </label>
                    </div>

                    {/* Claim Description */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Claim Description</label>
                        <textarea placeholder="Enter description here" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={5} />
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <Link href="/employee/claim-submit">
                            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                                Back
                            </button>
                        </Link>
                        <Link href="/employee/claim-success">
                            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                                Submit
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}