export default function CategoryPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold justify-between border-b border-slate-700 pb-4">Category Management</h1>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="font-semibold mb-4">Add New Category</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Category name"
                        className="border p-2 rounded flex-1"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Add
                    </button>
                </div>
            </div>


            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-4">Category Name</th>
                            <th className="p-4">Total Claims</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-t">
                            <td className="p-4">FOOD</td>
                            <td className="p-4">6</td>
                            <td className="p-4 space-x-3">
                                <span className="bg-blue-200 text-white px-3 py-1 rounded">default</span>
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="p-4">TRAVEL</td>
                            <td className="p-4">12</td>
                            <td className="p-4 space-x-3">
                                <span className="bg-blue-200 text-white px-3 py-1 rounded">default</span>
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="p-4">MEDICAL</td>
                            <td className="p-4">15</td>
                            <td className="p-4 space-x-3">
                                <span className="bg-blue-200 text-white px-3 py-1 rounded">default</span>
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="p-4">LODGING</td>
                            <td className="p-4">10</td>
                            <td className="p-4 space-x-3">
                                <span className="bg-blue-200 text-white px-3 py-1 rounded">default</span>
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="p-4">ACCOMODATION</td>
                            <td className="p-4">12</td>
                            <td className="p-4 space-x-3">
                                <button className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                                <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
