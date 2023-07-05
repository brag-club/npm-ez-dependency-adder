import { Roboto_Mono } from "next/font/google";

import "./globals.css";

const roboto = Roboto_Mono({subsets:["latin"]});

export const metadata = {
    title: "Nextjs 13, TailwindCss Template",
    description: "A template for frontend developers created By Chirag Bhalotia",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={`${roboto.className} text-text bg-background`}>{children}</body>
        </html>
    );
}
