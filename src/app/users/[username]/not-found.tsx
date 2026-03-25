import Header from "@/components/layout/Header";
import image from "../../../../public/no-picture.png";
import Image from "next/image";
import H1 from "@/components/layout/H1";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Usuário Não Encontrado | Minerva",
    description:
        "O usuário que você procura não existe. Continue aprendendo programação com desafios interativos no Minerva.",
    openGraph: {
        title: "Usuário Não Encontrado | Minerva",
        description:
            "O usuário que você procura não existe. Continue aprendendo programação com desafios interativos no Minerva.",
        type: "website",
    },
    twitter: {
        title: "Usuário Não Encontrado | Minerva",
        description:
            "O usuário que você procura não existe. Continue aprendendo programação com desafios interativos no Minerva.",
    },
    robots: {
        follow: true,
        index: false,
    },
};

export default function NotFoundUser() {
    return (
        <>
            <Header />
            <main className="flex flex-col gap-3 items-center text-lavender-blush text-xl p-3">
                <Image src={image} alt="" className="max-w-[250px]" />
                <H1 title="Usuário Não Encontrado" />
                <p>Página indisponível. Lamentamos o transtorno.</p>
                <Link href={"/"} className="underline">
                    Volte para a página principal
                </Link>
            </main>
        </>
    );
}
