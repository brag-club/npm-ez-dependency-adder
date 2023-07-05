"use client";

import Button from "@/components/ui/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

function useDebounce(callback: (t: string) => Promise<void> | void) {
    let timeout: null | NodeJS.Timeout = null;

    return (txt: string) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        let t = setTimeout(() => {
            callback(txt);
            timeout = null;
        }, 500);
        timeout = t;
    };
}

export default function Home() {
    const [searched, setSearched] = useState("");
    const [results, setResults] = useState<ISearchResult[]>([]);
    const [dependencies, setDependencies] = useState<string[]>([]);
    const [devDependencies, setDevDependencies] = useState<string[]>([]);
    const search = useDebounce(async (input: string) => {
        try {
            if (input === "") {
                return setResults([]);
            }
            const res = await axios.get("https://npm.io/api/v1/search", {
                params: {
                    query: input,
                },
            });
            const data = res.data?.list as ISearchResult[] | null;
            if (!data) return setResults([]);
            setResults(data);
            setSearched(input);
        } catch {
            toast.error("Error Searching for packages");
        }
    });

    const addDependency = (dependency: string) => {
        return () => {
            setDependencies(old => [...old, dependency]);
        };
    };

    const addDevDependency = (dependency: string) => {
        return () => {
            setDevDependencies(old => [...old, dependency]);
        };
    };

    return (
        <main className="mx-auto flex h-screen max-w-4xl flex-col justify-center px-4 py-10">
            <div className="input flex w-full text-gray-700">
                <input
                    type="text"
                    placeholder="Search for a package"
                    onChange={e => search(e.target.value)}
                    className="h-min w-full rounded-lg border-none px-6 py-4 text-xl shadow-black outline-none focus:border-none focus:shadow focus:outline-none focus:ring-0"
                />
            </div>
            {results.length > 0 && (
                <>
                    <h2 className="my-10 text-4xl font-semibold ">Search results: {searched}</h2>
                    <div className="results h-full w-full overflow-y-auto">
                        {results.map(result => {
                            return (
                                <div key={result.name} className="result border-b-2 py-5">
                                    <h2 className="text-2xl font-semibold tracking-wider">
                                        {result.name}
                                    </h2>
                                    <p className="pt-2 text-sm text-gray-800">
                                        {result.description}
                                    </p>
                                    <div className="tags my-6 flex w-full flex-wrap gap-3">
                                        {result.keywords?.map(keyword => {
                                            return (
                                                <div
                                                    key={keyword}
                                                    className="tag rounded-lg bg-gray-300 bg-opacity-70 p-2 text-sm"
                                                >
                                                    {keyword}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="info flex items-center gap-2 text-xs text-gray-500">
                                        <p className="version">{result.version}</p> {"•"}
                                        <p className="date">Published 2 months ago</p>
                                    </div>
                                    <div className="buttons mt-4 flex gap-3">
                                        <Button
                                            onClick={addDependency(result.name)}
                                            disabled={dependencies.includes(result.name)}
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            onClick={addDevDependency(result.name)}
                                            disabled={devDependencies.includes(result.name)}
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
            {dependencies.length > 0 && (
                <>
                    <p className="mb-2 mt-4">Dependencies: </p>
                    <div className="dependencies flex w-full flex-wrap gap-3 ">
                        {dependencies.map(dependency => {
                            return (
                                <Button variant={"secondary"} className="dependency text-xs">
                                    {dependency}
                                </Button>
                            );
                        })}
                        <Button className="dependency text-xs">{"Copy Command"}</Button>
                    </div>
                </>
            )}
            {devDependencies.length > 0 && (
                <>
                    <p className="mb-2 mt-4">Dev Dependencies: </p>
                    <div className="dependencies flex w-full flex-wrap gap-3 ">
                        {devDependencies.map(dependency => {
                            return (
                                <Button variant={"secondary"} className="dependency text-xs">
                                    {dependency}
                                </Button>
                            );
                        })}
                        <Button className="dependency text-xs">{"Copy Command"}</Button>
                    </div>
                </>
            )}
        </main>
    );
}
