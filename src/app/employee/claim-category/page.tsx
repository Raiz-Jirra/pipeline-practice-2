/**
 * Employee Claim Category Page - Step 2: Claim Details
 * 
 * Second step in the claim submission process where employees provide
 * detailed claim information including category, description, amount,
 * and receipt uploads.
 * 
 * Features:
 * - Dynamic category selection from database
 * - Category-specific fields (Medical: facehugger exposure; Travel: locations)
 * - Multiple receipt image upload with preview
 * - Form validation with visual feedback
 * - Image file type and size validation
 * 
 * @author Robert Jones
 * @page /employee/claim-category
 * @requires User must be logged in
 * @navigation Previous: /employee/claim-submit | Next: /employee/claim-success
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Category data structure for claim categories
 * 
 * @author Robert Jones
 * @interface Category
 * @property {string} key - Unique identifier (e.g., "MEDICAL", "TRAVEL")
 * @property {string} label - Display name for the category
 */
interface Category {
    key: string;
    label: string;
}

/**
 * ClaimCategory Component
 * 
 * Main claim submission form with dynamic fields based on selected category.
 * Handles validation, file uploads, and submission to the claims API.
 * 
 * @author Robert Jones
 * @component
 * @returns {JSX.Element} The claim details form page
 */
export default function ClaimCatagory() {
    /** Selected claim category key (MEDICAL, TRAVEL, etc.) */
    const [selectedCategory, setSelectedCategory] = useState('');

    /** Medical category only - indicates facehugger exposure */
    const [facehuggerExposure, setFacehuggerExposure] = useState(false);

    /** Travel category only - destination address */
    const [destination, setDestination] = useState('');

    /** Travel category only - origin/return address */
    const [returnTrip, setReturnTrip] = useState('');

    /** Available claim categories fetched from API */
    const [categories, setCategories] = useState<Category[]>([]);

    /** Uploaded receipt image files */
    const [receiptImages, setReceiptImages] = useState<File[]>([]);

    /** Base64 preview URLs for uploaded images */
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    /** Textual description of the claim */
    const [claimDescription, setClaimDescription] = useState('');

    /** Monetary amount of the claim in dollars */
    const [claimAmount, setClaimAmount] = useState<number>(0);

    /** Indicates if claim submission is in progress */
    const [submitting, setSubmitting] = useState(false);

    /** Reference to hidden file input element */
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

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
     * Categories Fetching Effect
     * 
     * Fetches available claim categories from API on component mount.
     * Categories are used to populate the category dropdown.
     * 
     * @author Robert Jones
     * @effect
     * @dependencies [] - Runs once on mount
     */
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();

                if (response.ok && Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error('Failed to fetch categories:', data);
                    setCategories([]);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setCategories([]);
            }
        };

        fetchCategories();
    }, []);

    /**
     * Handle Category Selection Change
     * 
     * Updates selected category and resets category-specific fields
     * when switching between categories to prevent stale data.
     * 
     * @author Robert Jones
     * @function handleCategoryChange
     * @param {React.ChangeEvent<HTMLSelectElement>} e - Change event from select
     */
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

    /**
     * Handle Image Upload
     * 
     * Validates and processes uploaded receipt images.
     * - Validates file types (JPEG, PNG only)
     * - Validates file size (max 5MB)
     * - Generates preview URLs using FileReader
     * 
     * @author Robert Jones
     * @function handleImageUpload
     * @param {React.ChangeEvent<HTMLInputElement>} e - Change event from file input
     */
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

    /**
     * Form Validation Check
     * 
     * Validates all required fields based on selected category:
     * - Common: category, description, receipt images, amount > 0
     * - Travel: destination and returnTrip required
     * 
     * @author Robert Jones
     * @function isFormValid
     * @returns {boolean} True if all required fields are valid
     */
    const isFormValid = () => {
        // Check the required fields
        if (!selectedCategory || !claimDescription || !receiptImages.length || claimAmount <= 0) {
            return false;
        }


        // Check TRAVEL fields
        if (selectedCategory === 'TRAVEL' && (!destination || !returnTrip)) {
            return false;
        }

        return true;
    }

    /**
     * Handle Claim Submission
     * 
     * Submits the claim data to the API endpoint.
     * Builds a complete claim object including category-specific details.
     * Redirects to success page on successful submission.
     * 
     * @author Robert Jones
     * @async
     * @function handleSubmit
     * @returns {Promise<void>}
     */
    const handleSubmit = async () => {
        if (!isFormValid() || submitting) return;

        setSubmitting(true);

        try {
            // Get userId from localStorage
            const userId = localStorage.getItem('userId');
            if (!userId) {
                alert('Please log in to submit a claim');
                router.push('/employee/login');
                return;
            }

            // Build claim data object
            const claimData = {
                employeeId: userId,
                category: selectedCategory,
                description: claimDescription,
                amount: claimAmount,
                receipts: receiptImages.map(file => file.name),
                travelDetails: selectedCategory === 'TRAVEL' ? {
                    startLocation: returnTrip,
                    endLocation: destination,
                    estimatedMileage: 0
                } : null,
                medicalDetails: selectedCategory === 'MEDICAL' ? {
                    specialExposure: facehuggerExposure
                } : null
            };

            // Submit to API
            const response = await fetch('/api/employee/submitClaim', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(claimData)
            });

            const result = await response.json();

            if (result.success) {
                // Success! Navigate to success page
                router.push('/employee/claim-success');
            } else {
                alert(`Failed to submit claim: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error submitting claim:', error);
            alert('Error submitting claim. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
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
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Claim!</h2>
                        <p className="text-gray-600">Please fill out the form below to submit a new claim</p>
                    </div>

                    {/* Claim Catagory */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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

                        {/* Claim Amount */}
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Claim Amount ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={claimAmount || ''}
                                onChange={(e) => setClaimAmount(parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-sm text-gray-500 mt-1">Enter the total amount in dollars (e.g., 150.00)</p>
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
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-medium"
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
                                                    className="w-full h-32 object-cover border border-gray-200 rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setReceiptImages(receiptImages.filter((_, i) => i !== index));
                                                        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
                                                    }}
                                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-800"
                                                >
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between items-center mt-6">
                                <Link href="/employee/claim-dashboard">
                                    <button className="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition font-medium">
                                        Back
                                    </button>
                                </Link>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isFormValid() || submitting}
                                    className={`px-6 py-3 rounded-md transition font-medium ${isFormValid() && !submitting ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                                    {submitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}