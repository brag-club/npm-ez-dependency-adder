interface ISearchResult {
    name: string;
    scope: string;
    version: string;
    description: string;
    keywords: string[];
    date: string;
    links: {
        npm: string;
        homepage: string;
        repository: string;
        bugs: string;
    };
    author: {
        name: string;
        email: string;
    };
    publisher: {
        username: string;
        email: string;
    };
    maintainers: {
        username: string;
        email: string;
    }[];
}
