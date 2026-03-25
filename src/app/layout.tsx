import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "Minerva",
    description: "Aprenda programação do zero com gamificação! Teste seus conhecimentos com desafios interativos.",
    openGraph: {
        title: "Minerva",
        description: "Aprenda programação do zero com gamificação! Teste seus conhecimentos com desafios interativos.",
        type: "website",
    },
    twitter: {
        title: "Minerva",
        description: "Aprenda programação do zero com gamificação! Teste seus conhecimentos com desafios interativos."
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body
                className={`${inter.className} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
