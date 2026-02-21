"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Claims", href: "/admin/dashboard/claims" },
    { label: "Reports", href: "/admin/dashboard/reports" },
    { label: "User management", href: "/admin/users" },
    { label: "Category management", href: "/admin/categories" }
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white">
            <div className="p-6 text-xl font-bold border-b border-slate-700">
                Admin Dashboard
            </div>

            <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);

                    return (

                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-lg px-4 py-2 transition${isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-800"}`}>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
