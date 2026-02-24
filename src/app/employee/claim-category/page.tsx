'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ClaimCatagory() {


    const [selectedCategory, setSelectedCategory] = useState('');
    const [facehuggerExposure, setFacehuggerExposure] = useState(false);
    const [destination, setDestination] = useState('');
    const [returnTrip, setReturnTrip] = useState('');
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);

        // Reset facehugger exposure if not medical
        if (newCategory !== 'Medical') {
            setFacehuggerExposure(false);
        }

        // Reset travel fields if not travel
        if (newCategory !== 'Travel') {
            setDestination('');
            setReturnTrip('');
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

                {/* Claim Catagory */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6">Claim Information</h2>

                    {/* Select Category */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Category</label>
                        <select value={selectedCategory} onChange={handleCategoryChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select a category</option>
                            <option value="Food">Food</option>
                            <option value="Lodging">Lodging</option>
                            <option value="Travel">Travel</option>
                            <option value="Medical">Medical</option>
                        </select>
                    </div>

                    {/* Medical Category checkbox */}
                    {selectedCategory === 'Medical' && (
                        <div className="mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={facehuggerExposure}
                                    onChange={(e) => setFacehuggerExposure(e.target.checked)}
                                />
                                <span>Facehugger Exposure</span>
                            </label>
                        </div>
                    )}

                    {/* Travel Category fields */}
                    {selectedCategory === 'Travel' && (
                        <div className="mb-4 space-y-4">
                            <div>
                                <label className="block font-semibold mb-2">Where are you traveling from?</label>
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Enter Address"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">Where are you traveling to?</label>
                                <input
                                    type="text"
                                    value={returnTrip}
                                    onChange={(e) => setReturnTrip(e.target.value)}
                                    placeholder="Enter Address"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}

                    {/* Claim Description */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Claim Description</label>
                        <textarea placeholder="Enter description here" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={5} />
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                            <Link href="/employee/claim-dashboard">
                                Back
                            </Link>
                        </button>
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                            <Link href="/employee/claim-success">
                                Submit
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}