import React from "react";
import Button from "../ui/Button";
import { useDependencies } from "@/contexts/dependencies";
import Contributors from "@/components/Contributors";
import DependenciesList from "@/components/DependenciesList";
import { ClipboardDocumentIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

function Dependencies() {
    const {
        dependencies,
        devDependencies,
        prefPMInstallCmd,
        removeDependency,
        removeDevDependency,
        selectPackageManager,
        setDependencies,
        setDevDependencies,
    } = useDependencies();
    const buttomInteraction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Choosing the action based on the value of clicked button
        const interactSent: ButtonInteraction = e.currentTarget.value as ButtonInteraction;
        switch (interactSent) {
            case "copy dep": {
                navigator.clipboard.writeText(`${prefPMInstallCmd} ${dependencies.join(" ")}`);
                break;
            }
            case "copy devDep": {
                navigator.clipboard.writeText(
                    `${prefPMInstallCmd} -D ${devDependencies.join(" ")}`,
                );
                break;
            }
            case "reset": {
                setDependencies([]);
                setDevDependencies([]);
                break;
            }

            case "share": {
                const depData = JSON.stringify([dependencies, devDependencies]);
                const preFetch = Buffer.from(depData).toString("base64");
                const url = new URL(window.location.href);
                url.searchParams.set("pre", preFetch);
                navigator.clipboard.writeText(url.toString());
                break;
            }
        }

        //Displaying success message after copying to clipboard
        toast.success("Copied to clipboard");
    };

    return (
        <>
            {dependencies.length === 0 && devDependencies.length === 0 && (
                <>
                    <p className="mb-2 text-lg font-semibold">
                        Select Dependencies that you want to install in your project
                    </p>
                    <div className="dependencies flex w-full py-9">
                        <div className="dependency mx-auto flex flex-col items-center justify-center gap-2">
                            <img
                                src="/logo.svg"
                                alt="npm logo"
                                className="h-60 w-auto max-h-[20vh] object-contain object-center"
                            />
                        </div>
                    </div>
                </>
            )}

            {dependencies.length > 0 && (
                <DependenciesList
                    name="Dependencies"
                    dependencies={dependencies}
                    onRemove={removeDependency}
                />
            )}
            {devDependencies.length > 0 && (
                <DependenciesList
                    name="Dev Dependencies"
                    dependencies={devDependencies}
                    onRemove={removeDevDependency}
                />
            )}
            <div className="commands-section mt-auto flex w-full flex-col gap-5">
                <div className="selector">
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Prefered Package Manager
                    </label>
                    <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
                        defaultValue="yarn"
                        onChange={selectPackageManager}
                    >
                        <option value={"yarn add"}>Yarn</option>
                        <option value={"npm install"}>Npm</option>
                        <option value={"pnpm add"}>Pnpm</option>
                    </select>
                </div>
                <div className="command">
                    <p className="mb-3 font-medium">Dependencies</p>
                    <div className="flex w-full items-center overflow-hidden rounded-lg border border-primary shadow">
                        <code className="h-full w-full overflow-x-auto bg-gray-50 px-4 py-2">
                            <p className="w-max pr-4">
                                {dependencies.length > 0
                                    ? `${prefPMInstallCmd} ${dependencies.join(" ")}`
                                    : "Nothing Selected"}
                            </p>
                        </code>
                        <Button
                            className="rounded-none"
                            onClick={buttomInteraction}
                            value={"copy dep"}
                        >
                            <ClipboardDocumentIcon className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
                <div className="command">
                    <p className="mb-3 font-medium">Dev Dependencies</p>
                    <div className="flex w-full items-center overflow-hidden rounded-lg border border-primary shadow">
                        <code className="h-full w-full overflow-x-auto bg-gray-50 px-4 py-2">
                            <p className="w-max pr-4">
                                {devDependencies.length > 0
                                    ? `${prefPMInstallCmd} -D ${devDependencies.join(" ")}`
                                    : "Nothing Selected"}
                            </p>
                        </code>
                        <Button
                            className="rounded-none"
                            onClick={buttomInteraction}
                            value={"copy devDep"}
                        >
                            <ClipboardDocumentIcon className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
                <div className="command flex justify-center gap-2 px-1">
                    <Button className="rounded-none" onClick={buttomInteraction} value={"reset"}>
                        <div className="flex items-center justify-center">
                            <TrashIcon className="h-6 w-6" />
                            <p className="ml-2">Reset</p>
                        </div>
                    </Button>
                    <Button className="rounded-none" onClick={buttomInteraction} value={"share"}>
                        <div className="flex items-center justify-center">
                            <ShareIcon className="h-6 w-6" />
                            <p className="ml-2">Share</p>
                        </div>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Dependencies;
