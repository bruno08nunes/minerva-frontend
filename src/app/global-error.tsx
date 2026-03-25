"use client";
import H1 from "@/components/layout/H1";
import Image from "next/image";
import image from "../../public/programming2.png";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Página de Erro | Minerva",
    description:
        "Erro ao acessar essa página! Continue aprendendo programação com desafios interativos no Minerva.",
    openGraph: {
        title: "Página de Erro | Minerva",
        description:
            "Erro ao acessar essa página! Continue aprendendo programação com desafios interativos no Minerva.",
        type: "website",
    },
    twitter: {
        title: "Página de Erro | Minerva",
        description:
            "Erro ao acessar essa página! Continue aprendendo programação com desafios interativos no Minerva.",
    },
    robots: {
        follow: true,
        index: false,
    },
};

export default function GlobalError({
    error,
}: {
    error: Error & { digest?: string };
}) {
    return (
        <html>
            <head>
                <title>Erro - Minerva</title>
            </head>
            <body className="text-center text-lavender-blush text-xl p-3">
                <H1 title="Erro!" />
                <Image
                    src={image}
                    alt=""
                    className="block mx-auto max-w-[250px]"
                />
                <h2 className="text-2xl mb-2">
                    Estamos passando por problemas! Tente novamente mais tarde.
                </h2>
                <p className="mb-2">{error.message}</p>
                <Link href={"/"} className="underline">
                    Volte para a página principal
                </Link>
            </body>
        </html>
    );
}
