import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "Minerva",
    description: "Minerva é uma aplicação...", // Todo: Update description
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body
                className={`${inter.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
