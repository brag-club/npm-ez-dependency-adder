"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { useDebounce } from "@/lib/debounce";

import SearchBar from "../SearchBar";
import Results from "./Results";

function SearchResults() {
    const [searched, setSearched] = useState("");
    const [results, setResults] = useState<ISearchResults>();

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
    return (
        <>
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
                    <h2 className="my-4 mb-2 text-4xl font-semibold ">
                        Search results: {searched}
                    </h2>
                    <Results results={results} />
                </>
            )}
        </>
    );
}

export default SearchResults;
