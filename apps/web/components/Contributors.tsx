import React from "react";

function Contributors() {
    return (
        <div className="mt-10 flex w-full justify-center">
            <p className="text-sm text-gray-500">
                Made with ❤️ by
                {" "}
                <a href="https://github.com/chirag3003" className="text-blue-700">
                    Chirag Bhalotia
                </a>
                {" "}
                and
                {" "}
                <a href="https://github.com/bravo68web" className="text-blue-700">
                    {" "}
                    Jyotirmoy Bandopadhayaya
                </a>
                {" "}
                . ⭐ Star this repo on
                {" "}
                <a
                    href="https://github.com/chirag3003/npm-ez-dependency-adder"
                    className="text-blue-700"
                >
                    {" "}
                    Github
                </a>
                {" "}
                .
            </p>
        </div>
    );
}

export default Contributors;
