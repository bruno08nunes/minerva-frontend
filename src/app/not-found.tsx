import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import Image from "next/image";
import image from "../../public/programming2.png";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Página Não Encontrada | Minerva",
    description:
        "A página que você procura não existe. Continue aprendendo programação com desafios interativos no Minerva.",
    openGraph: {
        title: "Página Não Encontrada | Minerva",
        description:
            "A página que você procura não existe. Continue aprendendo programação com desafios interativos no Minerva.",
        type: "website",
    },
    twitter: {
        title: "Página Não Encontrada | Minerva",
        description:
            "A página que você procura não existe. Continue aprendendo programação com desafios interativos no Minerva.",
    },
    robots: {
        follow: true,
        index: false,
    },
};

export default async function NotFoundPage() {
    return (
        <>
            <Header />
            <main className="text-center text-lavender-blush text-xl p-3">
                <section className="flex items-center flex-col">
                    <H1 title="Página Não Encontrada!" />
                    <Image src={image} alt="" className="max-w-[300px]" />
                    <p>Página indisponível. Lamentamos o transtorno.</p>
                    <Link href={"/"} className="underline">
                        Volte para a página principal
                    </Link>
                </section>
            </main>
        </>
    );
}
