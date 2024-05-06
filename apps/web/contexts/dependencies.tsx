"use client";

import { useState, createContext, useContext } from "react";
interface DependencyContext {
    dependencies: string[];
    devDependencies: string[];
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
    setDependencies: () => {},
    setDevDependencies: () => {},
    prefPMInstallCmd: "yarn add",
    addDependency: () => () => {},
    addDevDependency: () => () => {},
    removeDependency: () => () => {},
    removeDevDependency: () => () => {},
    selectPackageManager: () => {},
});
export const useDependencies = () => {
    return useContext(depencyContext);
};

interface DependencyProviderProps {
    children: React.ReactNode;
}
export const DependencyProvider = ({ children }: DependencyProviderProps) => {
    const [dependencies, setDependencies] = useState<string[]>([]);
    const [devDependencies, setDevDependencies] = useState<string[]>([]);
    const [prefPMInstallCmd, setPrefPMInstallCmd] = useState<PackageManagers>("yarn add");
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

    return (
        <depencyContext.Provider
            value={{
                dependencies,
                setDependencies,
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
