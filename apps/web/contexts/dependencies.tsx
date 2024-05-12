/* eslint-disable unicorn/consistent-function-scoping */
"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
interface DependencyContext {
    dependencies: string[];
    devDependencies: string[];
    peerEnabled: boolean;
    togglePeerEnabled: () => void;
    setDependencies: (dependencies: string[]) => void;
    setDevDependencies: (dependencies: string[]) => void;
    prefPMInstallCmd: PackageManagers;
    addDependency: (dependency: string) => () => void;
    addDevDependency: (dependency: string) => () => void;
    removeDependency: (dependency: string) => () => void;
    removeDevDependency: (dependency: string) => () => void;
    selectPackageManager: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const depencyContext = createContext<DependencyContext>({
    dependencies: [],
    devDependencies: [],
    peerEnabled: false,
    togglePeerEnabled: () => {},
    setDependencies: () => {},
    setDevDependencies: () => {},
    prefPMInstallCmd: "yarn add",
    addDependency: () => () => {},
    addDevDependency: () => () => {},
    removeDependency: () => () => {},
    removeDevDependency: () => () => {},
    selectPackageManager: () => {},
});
export function useDependencies() {
    return useContext(depencyContext);
}

interface DependencyProviderProps {
    children: React.ReactNode;
}
export const DependencyProvider = ({ children }: DependencyProviderProps) => {
    const [dependencies, setDependencies] = useState<string[]>([]);
    const [devDependencies, setDevDependencies] = useState<string[]>([]);
    const [prefPMInstallCmd, setPrefPMInstallCmd] = useState<PackageManagers>("yarn add");
    const [preContentRead, setPreContentRead] = useState<boolean>(false);
    const [peerEnabled, setPeerEnabled] = useState(false);
    const searchParams = useSearchParams();
    const preFetch = searchParams.get("pre") ?? "";

    const togglePeerEnabled = () => {
        setPeerEnabled(old => !old);
    };
    const addDependency = (dependency: string) => {
        return () => {
            if (devDependencies.includes(dependency)) {
                setDevDependencies(old => old.filter(dep => dep !== dependency));
            }

            setDependencies(old => [...old, dependency]);
        };
    };
    const addDevDependency = (dependency: string) => {
        return () => {
            if (dependencies.includes(dependency)) {
                setDependencies(old => old.filter(dep => dep !== dependency));
            }

            setDevDependencies(old => [...old, dependency]);
        };
    };
    const selectPackageManager = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPrefPMInstallCmd(e.target.value as PackageManagers);
    };
    const removeDependency = (dependency: string) => {
        return () => {
            setDependencies(old => old.filter(dep => dep !== dependency));
        };
    };
    const removeDevDependency = (dependency: string) => {
        return () => {
            setDevDependencies(old => old.filter(dep => dep !== dependency));
        };
    };
    useEffect(() => {
        if (preContentRead || !preFetch) return;
        const depData = Buffer.from(preFetch, "base64").toString("utf8");
        const [deps, devDeps] = JSON.parse(depData);
        setDependencies(deps);
        setDevDependencies(devDeps);
        setPreContentRead(true);
    }, [preContentRead, preFetch]);

    return (
        <depencyContext.Provider
            value={{
                dependencies,
                setDependencies,
                peerEnabled,
                togglePeerEnabled,
                devDependencies,
                setDevDependencies,
                prefPMInstallCmd,
                addDependency,
                addDevDependency,
                removeDependency,
                removeDevDependency,
                selectPackageManager,
            }}
        >
            {children}
        </depencyContext.Provider>
    );
};
