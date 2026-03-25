import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import Image from "next/image";
import image from "../../../../../public/programming2.png";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Explicação Não Encontrada | Minerva",
    description:
        "A explicação que você procura não existe. Continue aprendendo programação com desafios interativos no Minerva.",
    openGraph: {
        title: "Explicação Não Encontrada | Minerva",
        description:
            "A explicação que você procura não existe. Continue aprendendo programação com desafios interativos no Minerva.",
        type: "website",
    },
    twitter: {
        title: "Explicação Não Encontrada | Minerva",
        description:
            "A explicação que você procura não existe. Continue aprendendo programação com desafios interativos no Minerva.",
    },
    robots: {
        follow: true,
        index: false,
    },
};

export default function NotFoundExplanationPage() {
    return (
        <>
            <Header />
            <main className="text-lavender-blush text-center flex flex-col gap-3 text-xl items-center">
                <H1 title="Explicação Não Encontrada" />
                <Image src={image} alt="" className="max-w-[250px]" />
                <p>Página indisponível. Lamentamos o transtorno.</p>
                <Link href={"/"} className="underline">
                    Volte para a página principal
                </Link>
            </main>
        </>
    );
}
