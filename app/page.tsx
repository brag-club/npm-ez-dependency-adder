"use client";

import { useState } from "react";

import {
    ArrowUpRightIcon,
    ClipboardDocumentIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/Button";

function useDebounce(callback: (t: string) => Promise<void> | void) {
    let timeout: null | NodeJS.Timeout = null;

    return (txt: string) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        const t = setTimeout(() => {
            callback(txt);
            timeout = null;
        }, 500);
        timeout = t;
    };
}

function handleLastUpdated(date: Date, currentDate: string) {
    const now = new Date(currentDate);
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (days === 0) {
        return `${hours} hours ago`;
    } else if (days === 1) {
        return `${days} day ago`;
    } else if (days < 30) {
        return `${days} days ago`;
    } else if (months === 1) {
        return `${months} month ago`;
    } else if (months < 12) {
        return `${months} months ago`;
    } else if (years === 1) {
        return `${years} years ago`;
    } else {
        return `${years} years ago`;
    }
}

export default function Home() {
    const [searched, setSearched] = useState("");
    const [results, setResults] = useState<ISearchResults>();

    const [dependencies, setDependencies] = useState<string[]>([]);
    const [devDependencies, setDevDependencies] = useState<string[]>([]);

    const [prefPMInstallCmd, setPrefPMInstallCmd] = useState<PackageManagers>("yarn add");

    const search = useDebounce(async (input: string) => {
        try {
            if (input === "") {
                return setResults(undefined);
            }
            const res = await axios.get("https://registry.npmjs.com/-/v1/search", {
                params: {
                    text: input,
                },
            });
            const data = res.data as ISearchResults;
            if (!data) return setResults(undefined);
            setResults(data);
            setSearched(input);
        } catch {
            toast.error("Error Searching for packages");
        }
    });

    const addDependency = (dependency: string) => {
        return () => {
            if (devDependencies.includes(dependency)) {
                setDevDependencies(old => old.filter(dep => dep !== dependency));
            }

            setDependencies(old => [...old, dependency]);
        };
    };

    const addDevDependency = (dependency: string) => {
        return () => {
            if (dependencies.includes(dependency)) {
                setDependencies(old => old.filter(dep => dep !== dependency));
            }

            setDevDependencies(old => [...old, dependency]);
        };
    };

    const selectPackageManager = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPrefPMInstallCmd(e.target.value as PackageManagers);
    };

    const buttomInteraction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let interactSent = e.currentTarget.value;
        e.preventDefault();

        switch (interactSent) {
            case "copy dep": {
                interactSent = `${prefPMInstallCmd} ${dependencies.join(" ")}`;
                navigator.clipboard.writeText(interactSent);

                break;
            }
            case "copy devDep": {
                interactSent = `${prefPMInstallCmd} -D ${devDependencies.join(" ")}`;
                navigator.clipboard.writeText(interactSent);

                break;
            }
            case "reset": {
                setDependencies([]);
                setDevDependencies([]);

                break;
            }
        }
    };

    const removeDependency = (dependency: string) => {
        return () => {
            setDependencies(old => old.filter(dep => dep !== dependency));
        };
    };

    const removeDevDependency = (dependency: string) => {
        return () => {
            setDevDependencies(old => old.filter(dep => dep !== dependency));
        };
    };

    return (
        <main className="mx-auto flex h-screen justify-center px-28 py-10">
            <div className="flex w-1/2 flex-col px-4">
                <div className="input flex w-full text-gray-700">
                    <input
                        type="text"
                        placeholder="Search for a package"
                        onChange={e => search(e.target.value)}
                        className="h-min w-full rounded-lg border-none px-6 py-4 text-xl shadow-black outline-none focus:border-none focus:shadow focus:outline-none focus:ring-0"
                    />
                </div>
                {(results == null || undefined) && (
                    <div className="flex h-full w-full flex-col items-center justify-center">
                        <img
                            src="/noresult.jpg"
                            alt="no result image"
                            className="h-30 w-60 rounded-2xl object-contain"
                        />
                        <p className="mt-4 text-xl text-gray-500">Noting to show</p>
                    </div>
                )}
                {results && results.objects.length > 0 && (
                    <>
                        <h2 className="my-10 text-4xl font-semibold ">
                            Search results: {searched}
                        </h2>
                        <div className="results h-full w-full overflow-y-auto">
                            {results?.objects.map(result => {
                                return (
                                    <div
                                        key={result.package.name}
                                        className="result border-b-2 py-5"
                                    >
                                        <h2 className="text-2xl font-semibold tracking-wider">
                                            {result.package.name}
                                            <a
                                                href={result.package.links.npm}
                                                className="text-blue-500"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <ArrowUpRightIcon className="inline-block h-4 w-4" />
                                            </a>
                                        </h2>
                                        <p className="pt-2 text-sm text-gray-800">
                                            {result.package.description
                                                ? result.package.description
                                                : "No description available"}
                                        </p>
                                        <div className="tags my-6 flex w-full flex-wrap gap-3">
                                            {result.package.keywords?.map(keyword => {
                                                return (
                                                    <div
                                                        key={keyword}
                                                        className="tag rounded-lg bg-gray-300/70 p-2 text-sm"
                                                    >
                                                        {keyword}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="info flex items-center gap-2 text-xs text-gray-500">
                                            <p className="version">{result.package.version}</p>{" "}
                                            {"•"}
                                            <p className="date">
                                                Last Updated :-{" "}
                                                {handleLastUpdated(
                                                    new Date(result.package.date),
                                                    results.time,
                                                )}
                                            </p>
                                        </div>
                                        <div className="buttons mt-4 flex gap-3">
                                            <Button
                                                onClick={addDependency(result.package.name)}
                                                disabled={dependencies.includes(
                                                    result.package.name,
                                                )}
                                            >
                                                Add
                                            </Button>
                                            <Button
                                                onClick={addDevDependency(result.package.name)}
                                                disabled={devDependencies.includes(
                                                    result.package.name,
                                                )}
                                            >
                                                Add as dev
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            <div className="flex w-1/2 flex-col px-4 py-12">
                {dependencies.length === 0 && devDependencies.length === 0 && (
                    <>
                        <p className="mb-2 text-lg font-semibold">
                            Select Dependencies that you want to install in your project
                        </p>
                        <div className="dependencies flex w-full py-9">
                            <div className="dependency flex flex-col items-center justify-center gap-2">
                                <img
                                    src="https://raw.githubusercontent.com/npm/logos/master/npm%20logo/npm-logo-red.png"
                                    alt="npm logo"
                                    className="h-30 w-60 object-contain"
                                />
                            </div>
                        </div>
                    </>
                )}

                {dependencies.length > 0 && (
                    <>
                        <p className="mb-2 text-lg font-semibold">Dependencies: </p>
                        <div className="dependencies flex w-full flex-wrap gap-3 ">
                            {dependencies.map(dependency => {
                                return (
                                    <Button
                                        key={dependency}
                                        variant={"secondary"}
                                        className="dependency flex text-xs"
                                        onClick={removeDependency(dependency)}
                                    >
                                        {dependency}
                                        <XMarkIcon className="ml-2 h-4 w-4" />
                                    </Button>
                                );
                            })}
                            {/* <Button className="dependency text-xs">{"Copy Command"}</Button> */}
                        </div>
                    </>
                )}
                {devDependencies.length > 0 && (
                    <>
                        <p className="mb-2 mt-4 text-lg font-semibold">Dev Dependencies: </p>
                        <div className="dependencies flex w-full flex-wrap gap-3 ">
                            {devDependencies.map(dependency => {
                                return (
                                    <Button
                                        key={dependency}
                                        variant={"secondary"}
                                        className="dependency flex text-xs"
                                        onClick={removeDevDependency(dependency)}
                                    >
                                        {dependency}
                                        <XMarkIcon className="ml-2 h-4 w-4" />
                                    </Button>
                                );
                            })}
                            {/* <Button className="dependency text-xs">{"Copy Command"}</Button> */}
                        </div>
                    </>
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
                    <div className="command justify-center">
                        <Button
                            className="rounded-none"
                            onClick={buttomInteraction}
                            value={"reset"}
                        >
                            <div className="flex items-center justify-center">
                                <TrashIcon className="h-6 w-6" />
                                <p className="ml-2">Reset</p>
                            </div>
                        </Button>
                    </div>
                    <div className="mt-10 flex w-full justify-center">
                        <p className="text-sm text-gray-500">
                            Made with ❤️ by
                            <a href="https://github.com/chirag3003" className="text-blue-500">
                                {" "}
                                Chirag Bhalotia{" "}
                            </a>
                            and
                            <a href="https://github.com/bravo68web" className="text-blue-500">
                                {" "}
                                Jyotirmoy Bandopadhayaya
                            </a>
                            . ⭐ Star this repo on
                            <a
                                href="https://github.com/chirag3003/npm-ez-dependency-adder"
                                className="text-blue-500"
                            >
                                {" "}
                                Github
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
