import AdminSidebar from "../components/adminSidebar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex">
            <AdminSidebar />
            <main className="flex-1 bg-gray-100 p-6">
                {children}
            </main>
        </div>
    );
}
