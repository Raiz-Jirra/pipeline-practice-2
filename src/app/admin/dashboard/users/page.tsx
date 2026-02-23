

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold border-b border-slate-700 pb-4">User Management</h1>

            {/* Top Bar */}
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="border p-2 rounded w-64"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Add User
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Created</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-t">
                            <td className="p-4">Chris Baron</td>
                            <td className="p-4">chris@test.com</td>
                            <td className="p-4">EMPLOYEE</td>
                            <td className="p-4">2026-02-21</td>
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

