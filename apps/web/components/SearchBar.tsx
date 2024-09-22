import React from "react";

interface SearchBarProps {
    onSearch: (t: string) => void;
}

function SearchBar({ onSearch }: Readonly<SearchBarProps>) {
    return (
        <div className="input flex w-full text-gray-700">
            <input
                type="text"
                placeholder="Search for a package"
                onChange={e => onSearch(e.target.value)}
                className="h-min w-full rounded-lg border-none px-6 py-4 text-xl shadow-black outline-none focus:border-none focus:shadow focus:outline-none focus:ring-0"
            />
        </div>
    );
}

export default SearchBar;
