interface ISearchPackagesResult {
    package: {
        name: string;
        scope: string;
        version: string;
        description?: string;
        keywords: string[];
        date: Date;
        links: {
            npm: string;
            homepage?: string;
            repository?: string;
            issues?: string;
            bugs?: string;
        };
        author?: {
            name: string;
            email?: string;
            url?: string;
        };
        publisher?: {
            username: string;
            email?: string;
        };
        maintainers?: [
            {
                username: string;
                email?: string;
            },
        ];
    };
    flags?: {
        unstable: boolean;
    };
    score: {
        final: number;
        detail: {
            quality: number;
            popularity: number;
            maintenance: number;
        };
        searchScore: number;
    };
    searchScore: number;
}

interface ISearchResults {
    objects: ISearchPackagesResult[] | [];
    // TODO: If there are no results, show a message, "No results found"
    // TODO: If there are more than 50 results, tell the user to refine their search query
    total: number;
    time: string;
}
