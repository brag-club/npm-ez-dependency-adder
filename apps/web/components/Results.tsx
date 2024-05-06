import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Github } from "lucide-react";
import React from "react";

import Button from "./ui/Button";
import { useDependencies } from "@/contexts/dependencies";

interface ResultsInterface {
    results: ISearchResults;
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

function Results({
    results,
}: ResultsInterface) {
    const {dependencies, devDependencies, addDependency, addDevDependency} = useDependencies()
    return (
        <div className="results h-full w-full overflow-y-auto pt-1">
            {results?.objects.map(result => {
                return (
                    <div key={result.package.name} className="result border-b-2 py-5">
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
                        {result?.package?.publisher?.username && (
                            <a
                                href={"https://npmjs.com/~" + result?.package?.publisher?.username}
                                className="text-red-500"
                                target="_blank"
                                referrerPolicy="no-referrer"
                                rel="noreferrer"
                            >
                                by @{result?.package?.publisher?.username}
                            </a>
                        )}
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
                            <p className="version">{result.package.version}</p> {"•"}
                            <p className="date">
                                Last Updated :-{" "}
                                {handleLastUpdated(new Date(result.package.date), results.time)}
                            </p>
                        </div>
                        <div className="buttons mt-4 flex gap-3">
                            <Button
                                onClick={addDependency(result.package.name)}
                                disabled={dependencies.includes(result.package.name)}
                            >
                                Add
                            </Button>
                            <Button
                                onClick={addDevDependency(result.package.name)}
                                disabled={devDependencies.includes(result.package.name)}
                            >
                                Add as dev
                            </Button>
                            <div className="flex-1"></div>
                            {result?.package?.links?.repository && (
                                <a
                                    href={result?.package?.links?.repository}
                                    className="mr-5 rounded-full bg-gray-800 p-2 text-white"
                                    target="_blank"
                                    referrerPolicy="no-referrer"
                                    rel="noreferrer"
                                >
                                    <Github />
                                </a>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Results;
