export default function EmployeeClaimForm() {
    // Mock data for demonstration
    const mockClaims = [
        {
            id: "CLM-001",
            date: "2026-01-15",
            catagory: "Travel",
            amount: 2000.00,
            status: "approved",
            description: "Your claim has been approved"
        },
        {
            id: "CLM-002",
            date: "2026-01-20",
            catagory: "Lodging",
            amount: 1500.00,
            status: "pending",
            description: "Your claim is currently being reviewed"
        },
        {
            id: "CLM-003",
            date: "2026-01-22",
            catagory: "Medical (Facehugger Exposure)",
            amount: 0,
            status: "rejected",
            description: "Your claim has been rejected"
        }
    ];

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">My Claims</h1>
                <p className="text-gray-600">View your claim status and history</p>
            </div>

            {/* Claim Status & History Section */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Claim Status & History</h2>
                    <button className="bg-gray-400">
                        Create New Claim
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-3 font-semibold">Claim ID</th>
                                <th className="text-left p-3 font-semibold">Category</th>
                                <th className="text-left p-3 font-semibold">Date</th>
                                <th className="text-left p-3 font-semibold">Amount</th>
                                <th className="text-left p-3 font-semibold">Status</th>
                                <th className="text-left p-3 font-semibold">Description</th>
                                <th className="text-left p-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockClaims.map((claim) => (
                                <tr key={claim.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{claim.id}</td>
                                    <td className="p-3">{claim.date}</td>
                                    <td className="p-3">{claim.catagory}</td>
                                    <td className="p-3">${claim.amount.toFixed(2)}</td>
                                    <td className="p-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${(claim.status)}`}>
                                            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="p-3">{claim.description}</td>
                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            <button className="bg-gray-400">
                                                View JPEG
                                            </button>
                                            <button className="bg-gray-400">
                                                View PDF
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty state (for when there are no claims) */}
                {mockClaims.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <p>No claims found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
