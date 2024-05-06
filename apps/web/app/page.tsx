"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Results from "@/components/Results";
import SearchBar from "@/components/SearchBar";
import { useDependencies } from "@/contexts/dependencies";
import { useDebounce } from "@/lib/debounce";
import Dependencies from "@/components/Dependencies";

export default function Home() {
    const [searched, setSearched] = useState("");
    const [results, setResults] = useState<ISearchResults>();
    const [preContentRead, setPreContentRead] = useState<boolean>(false);
    const searchParams = useSearchParams();

    const {
        addDependency,
        addDevDependency,
        dependencies,
        devDependencies,
        setDependencies,        setDevDependencies,
    } = useDependencies();

    const preFetch = searchParams.get("pre") ?? "";

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

    useEffect(() => {
        if (preContentRead || !preFetch) return;
        const depData = Buffer.from(preFetch, "base64").toString("utf8");
        const [deps, devDeps] = JSON.parse(depData);
        setDependencies(deps);
        setDevDependencies(devDeps);
        setPreContentRead(true);
    }, [preContentRead, preFetch]);

    return (
        <main className="mx-auto flex h-screen justify-center px-28 py-10">
            <Toaster />
            <div className="flex w-1/2 flex-col px-4">
                <SearchBar onSearch={search} />
                {(results == null || !results.objects || results.objects.length === 0) && (
                    <div className="flex h-full w-full flex-col items-center justify-center">
                        <img
                            src="/noresult.jpg"
                            alt="no result image"
                            className="h-30 w-60 rounded-2xl object-contain"
                        />
                        <p className="mt-4 text-xl text-gray-500">Noting to show</p>
                    </div>
                )}
                {results && results.objects?.length > 0 && (
                    <>
                        <h2 className="my-10 text-4xl font-semibold ">
                            Search results: {searched}
                        </h2>
                        <Results
                            addDependency={addDependency}
                            addDevDependency={addDevDependency}
                            dependencies={dependencies}
                            devDependencies={devDependencies}
                            results={results}
                        />
                    </>
                )}
            </div>

            <div className="flex w-1/2 flex-col px-4 py-12">
                <Dependencies />
            </div>
        </main>
    );
}
