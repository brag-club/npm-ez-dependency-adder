"use client";
import React, { Fragment } from "react";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";

const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
    { name: "Reports", href: "#", current: false },
];
const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];

const Navbar = () => {
    return (
        <Disclosure as="nav" className=" bg-primary lg:border-none">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex items-center px-2 lg:px-0">
                                <div className="shrink-0">
                                    <img
                                        className="block h-8 w-8"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=white"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden lg:ml-10 lg:block">
                                    <div className="flex space-x-4">
                                        {navigation.map(item => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    "rounded-md px-3 py-2 text-sm font-medium",
                                                    {
                                                        "bg-white bg-opacity-20 text-white":
                                                            item.current,
                                                        "bg-white bg-opacity-0 text-white hover:bg-opacity-10":
                                                            !item.current,
                                                    },
                                                )}
                                                aria-current={item.current ? "page" : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-primary p-2 text-white focus:outline-none">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="hidden lg:ml-4 lg:block">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="shrink-0 rounded-full bg-primary p-1 text-white focus:outline-none"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3 shrink-0">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-primary text-sm text-white focus:outline-none">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={user.imageUrl}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map(item => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={cn(
                                                                    "block px-4 py-2 text-sm text-gray-700",
                                                                    {
                                                                        "bg-gray-100": active,
                                                                    },
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="lg:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map(item => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={cn(
                                        "block rounded-md px-3 py-2 text-base font-medium",
                                        {
                                            "bg-primary text-white": item.current,
                                            "text-white hover:bg-opacity-75": !item.current,
                                        },
                                    )}
                                    aria-current={item.current ? "page" : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className=" pb-3 pt-4">
                            <div className="flex items-center px-5">
                                <div className="shrink-0">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={user.imageUrl}
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-white text-opacity-60">
                                        {user.email}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="ml-auto shrink-0 rounded-full bg-primary p-1 text-white focus:outline-none "
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map(item => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-white"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
