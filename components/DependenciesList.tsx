import React from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

import Button from "./ui/Button";

interface DependenciesList {
    dependencies: string[];
    name: string;
    onRemove: (t: string) => () => void;
}

function DependenciesList({ dependencies, name, onRemove }: DependenciesList) {
    return (
        <>
            <p className="mb-2 text-lg font-semibold">{name}: </p>
            <div className="dependencies flex w-full flex-wrap gap-3 ">
                {dependencies.map(dependency => {
                    return (
                        <Button
                            key={dependency}
                            variant={"secondary"}
                            className="dependency flex text-xs"
                            onClick={onRemove(dependency)}
                        >
                            {dependency}
                            <XMarkIcon className="ml-2 h-4 w-4" />
                        </Button>
                    );
                })}
            </div>
        </>
    );
}

export default DependenciesList;
