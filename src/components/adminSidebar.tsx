"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, BarChart3, Users, Layers, ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
    { label: "Claims", href: "/admin/dashboard/claims", icon: FileText },
    { label: "Reports", href: "/admin/dashboard/reports", icon: BarChart3 },
    { label: "User Management", href: "/admin/dashboard/users", icon: Users },
    { label: "Category Management", href: "/admin/dashboard/categories", icon: Layers }
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`min-h-screen bg-slate-950 text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                } flex flex-col`}
        >

            <div className="flex items-center justify-between p-6 border-b border-slate-800">
                {!collapsed && (
                    <div>
                        <h1 className="text-lg font-semibold">Admin Panel</h1>
                    </div>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 hover:bg-slate-800 rounded"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <nav className="flex-1 p-2 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                                ? "bg-slate-800 text-white"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <Icon size={18} />
                            {!collapsed && (
                                <span className="text-sm font-medium">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
                v2.0 Admin
            </div>
        </aside>
    );
}