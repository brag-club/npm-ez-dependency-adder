"use client";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";

import { useDependencies } from "@/contexts/dependencies";

export default function SettingsButton() {
    const { peerEnabled, togglePeerEnabled } = useDependencies();
    return (
        <div className="fixed top-8 right-8 w-52 text-right">
            <Menu>
                <MenuButton className="inline-flex items-center rounded-md bg-red-200/90 py-1.5 px-3 text-sm/6 font-semibold text-red-500 focus:outline-none data-[hover]:text-white data-[hover]:bg-primary data-[open]:bg-primary data-[open]:text-white data-[focus]:outline-1 ">
                    <Cog6ToothIcon className="size-6 " />
                </MenuButton>
                <Transition
                    enter="transition ease-out duration-75"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <MenuItems
                        anchor="bottom end"
                        className="w-72 origin-top-right rounded-xl border border-white/5 bg-primary p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none translate-y-2"
                    >
                        <MenuItem>
                            <button
                                onClick={togglePeerEnabled}
                                className="group text-white flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/30 text-left"
                            >
                                {/* <PencilIcon className="size-4" /> */}
                                {peerEnabled ? "Disable" : "Enable"} Peer Dependencies
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    );
}
