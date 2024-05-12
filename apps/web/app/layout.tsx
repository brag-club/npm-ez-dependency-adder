import "./globals.css";

import { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { DependencyProvider } from "@/contexts/dependencies";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NPM Easy Dependency Adder",
    description:
        "A simple tool to install dependencies and devDependencies to your project with ease. Easily search for packages and install them with a simplified command.",
    authors: [
        {
            name: "Chirag Bhalotia",
            url: "https://chirag.codes",
        },
        {
            name: "Jyotirmoy Bandyopadhayaya",
            url: "https://b68.dev",
        },
    ],
    category: "Developer Tools",
    creator: "Chirag Bhalotia",
    keywords: [
        "npm",
        "npm install",
        "npm install package",
        "npm install package --save",
        "npm install package --save-dev",
        "pnpm install",
        "pnpm",
        "pnpm add",
        "yarn",
        "yarn add",
        "yarn add package",
        "yarn install",
        "npmjs",
        "npm.io",
        "package manager",
        "package",
        "package.json",
        "package-lock.json",
        "pnpm-lock.yaml",
        "yarn.lock",
        "nodejs",
        "javascript",
        "typescript",
        "react",
        "reactjs",
        "react.js",
        "react-native",
        "express",
        "expressjs",
        "express.js",
        "nextjs",
        "next.js",
        "gatsby",
        "eslint",
        "dependencies",
        "devDependencies",
        "istall",
        "github",
        "module",
        "modules",
    ],
    abstract:
        "A simple tool to install dependencies and devDependencies to your project with ease. Easily search for packages and install them with a simplified command.",
    applicationName: "NPM Easy Dependency Adder",
    twitter: {
        title: "NPM Easy Dependency Adder",
        card: "summary",
        site: "https://deps.chirag.codes",
        images: "https://deps.chirag.codes/og-image.png",
    },
    openGraph: {
        title: "NPM Easy Dependency Adder",
        description:
            "A simple tool to install dependencies and devDependencies to your project with ease. Easily search for packages and install them with a simplified command.",
        url: "https://deps.chirag.codes",
        type: "website",
        siteName: "NPM Easy Dependency Adder",
        images: [
            {
                url: "https://deps.chirag.codes/og-image.png",
            },
        ],
        locale: "en_US",
    },
    assets: [
        "https://deps.chirag.codes/og-image.png",
        "https://deps.chirag.codes/favicon.ico",
        "https://deps.chirag.codes/nores",
    ],
    metadataBase: new URL("https://deps.chirag.codes/"),
    manifest: "/manifest.json",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={`${roboto.className} bg-background text-text`}>
                <DependencyProvider>{children}</DependencyProvider>
                <Toaster />
            </body>
        </html>
    );
}
