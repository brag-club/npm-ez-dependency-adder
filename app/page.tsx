import Button from "@/components/ui/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Home() {
    const [search,setSearch] = useState("search");
    const [results,setResults] = useState<ISearchResult[]>();
    
    return (
        <main className="mx-auto flex h-screen max-w-4xl flex-col justify-center px-4 py-10">
            <div className="input flex w-full text-gray-700">
                <input
                    type="text"
                    placeholder="hello"
                    className="h-min w-full rounded-l-lg border-none px-6 py-4 text-xl shadow-black outline-none focus:border-none focus:shadow focus:outline-none focus:ring-0"
                />
                <Button className="rounded-lg rounded-l-none">
                    <MagnifyingGlassIcon className="h-6 w-6" />
                </Button>
            </div>
            <h2 className="my-10 mt-20 text-4xl font-semibold ">Search results: React</h2>
            <div className="results h-full w-full overflow-y-auto">
                <div className="result border-b-2 py-5">
                    <h2 className="text-2xl font-semibold tracking-wider">react-is</h2>
                    <p className="pt-2 text-sm text-gray-800">Brand checking of react elements</p>
                    <div className="tags my-6 flex w-full flex-wrap gap-3">
                        <div className="tag rounded-lg bg-gray-300 bg-opacity-70 p-2 text-sm">
                            react
                        </div>
                    </div>
                    <div className="info flex items-center gap-2 text-xs text-gray-500">
                        <p className="version">1.56.7</p> {"•"}{" "}
                        <p className="date">Published 2 months ago</p>
                    </div>
                    <div className="buttons flex mt-4 gap-3">
                        <Button className="">Add</Button>
                        <Button>Add as dev</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
