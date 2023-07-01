import React, { Fragment } from "react";
import Navbar from "../../components/ui/Navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <>
            <div className="min-h-full">
                <Navbar />
                <main className="pt-10">
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </>
    );
}
