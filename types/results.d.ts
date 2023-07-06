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
        },
        author?: {
            name: string;
            email?: string;
            url?: string;
        },
        publisher?: {
            username: string;
            email?: string;
        },
        maintainers?: [{
            username: string;
            email?: string;
        }]
    };
    flags?: {
        unstable: boolean;
    }
    score: {
        final: number;
        detail: {
            quality: number;
            popularity: number;
            maintenance: number;
        },
        searchScore: number;
    };
    searchScore: number;
}

interface ISearchResults {
    objects: ISearchPackagesResult[] | [];
    total: number;
    time: Date
}
