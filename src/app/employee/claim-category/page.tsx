'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Category {
    key: string;
    label: string;
}

export default function ClaimCatagory() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [facehuggerExposure, setFacehuggerExposure] = useState(false);
    const [destination, setDestination] = useState('');
    const [returnTrip, setReturnTrip] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [receiptImages, setReceiptImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [claimDescription, setClaimDescription] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);

        if (newCategory !== 'MEDICAL') {
            setFacehuggerExposure(false);
        }

        if (newCategory !== 'TRAVEL') {
            setDestination('');
            setReturnTrip('');
        }
    };

    // Upload image of receipt
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSize = 5 * 1024 * 1024;
        const newFiles: File[] = [];
        const newPreviews: string[] = [];

        Array.from(files).forEach(file => {
            if (!validTypes.includes(file.type)) {
                alert(`${file.name}: Please upload only JPEG or PNG images`);
                return;
            }

            if (file.size > maxSize) {
                alert(`${file.name}: File size must be less than 5MB`);
                return;
            }

            newFiles.push(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result as string);
                if (newPreviews.length === newFiles.length) {
                    setImagePreviews([...imagePreviews, ...newPreviews]);
                }
            };
            reader.readAsDataURL(file);
        });

        setReceiptImages([...receiptImages, ...newFiles]);
        e.target.value = '';
    };

    // Validate form
    const isFormValid = () => {
        // Check the required fields
        if (!selectedCategory || !claimDescription || !receiptImages.length) {
            return false;
        }

        // Check TRAVEL fields
        if (selectedCategory === 'TRAVEL' && (!destination || !returnTrip)) {
            return false;
        }

        return true;
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
                            {categories.map((category) => (
                                <option key={category.key} value={category.key}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Medical Category checkbox */}
                    {selectedCategory === 'MEDICAL' && (
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
                    {selectedCategory === 'TRAVEL' && (
                        <div className="mb-4 space-y-4">
                            <div>
                                <label className="block font-semibold mb-2">Where are you traveling to?</label>
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Enter Address"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">Where are you traveling from?</label>
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
                        <textarea
                            value={claimDescription}
                            onChange={(e) => setClaimDescription(e.target.value)}
                            placeholder="Enter description here"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={5}
                        />
                    </div>


                    {/* Receipt Upload */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Upload Receipt</label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImageUpload}
                            className="hidden"
                            multiple
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                            {receiptImages.length > 0 ? `Add More (${receiptImages.length} selected)` : 'Choose Files'}
                        </button>
                        <p className="text-sm text-gray-500 mt-1">
                            Accepted formats: JPG, PNG. Max size: 5MB
                        </p>

                        {/* Image Preview */}
                        {imagePreviews.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-semibold mb-2">Previews:</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={preview}
                                                alt={`Receipt preview ${index + 1}`}
                                                className="w-full h-32 object-cover border border-gray-300 rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setReceiptImages(receiptImages.filter((_, i) => i !== index));
                                                    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
                                                }}
                                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-800"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-6">
                            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                                <Link href="/employee/claim-submit">
                                    Back
                                </Link>
                            </button>
                            <button
                                disabled={!isFormValid()}
                                className={`px-6 py-3 rounded-lg transition-colors font-semibold ${isFormValid()
                                    ? 'bg-blue-500 text-white hover:bg-blue-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <Link href="/employee/claim-success">
                                    Submit
                                </Link>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}