import React, {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {cn} from "@/lib/utils";
import Navbar from "../../components/ui/Navbar";

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
    return (
        <>
            <div className="min-h-full">
                <Navbar/>
                <main className="pt-10">
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </>
    )
}
