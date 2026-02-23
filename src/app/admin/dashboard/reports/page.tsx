export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold border-b border-slate-700 pb-4">Reports</h1>

            <div className="bg-white p-4 rounded-lg shadow flex gap-4 items-end">
                <div>
                    <label className="block text-sm font-medium">Start Date</label>
                    <input type="date" className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium">End Date</label>
                    <input type="date" className="border p-2 rounded w-full" />
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Apply Filter
                </button>
            </div>


            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Total Claims</h2>
                    <p className="text-3xl font-bold mt-2">42</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Approved</h2>
                    <p className="text-3xl font-bold mt-2 text-green-600">30</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Rejected</h2>
                    <p className="text-3xl font-bold mt-2 text-red-600">12</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">PENDING</h2>
                    <p className="text-3xl font-bold mt-2 text-yellow-600">10</p>
                </div>
            </div>

            {/* Chart Placeholders */}
            {/* <div className="grid grid-cols-2 gap-6"> */}
            <div className="bg-white p-4 rounded-lg shadow h-64 flex items-center justify-center text-gray-400">
                {/* <div className="bg-white p-6  shadow h-64 flex items-center justify-center text-gray-400">
                </div> */}
                Claims by Category (Bar Chart Placeholder)

                {/* <div className="bg-white p-6 rounded-lg shadow h-64 flex items-center justify-center text-gray-400">
                    Claims by Employee (Pie Chart Placeholder)
                </div> */}
            </div>
        </div>
    );
}
