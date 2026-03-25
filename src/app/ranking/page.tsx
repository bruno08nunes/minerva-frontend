import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { listUserRanking } from "@/lib/api/user";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Ranking | Minerva",
    description:
        "Veja o ranking dos melhores usuários em lógica e programação no Minerva. Compare níveis, conquistas e evolução na plataforma.",
    openGraph: {
        title: "Ranking | Minerva",
        description:
            "Veja o ranking dos melhores usuários em lógica e programação no Minerva. Compare níveis, conquistas e evolução na plataforma.",
        type: "website",
    },
    twitter: {
        title: "Ranking | Minerva",
        description:
            "Veja o ranking dos melhores usuários em lógica e programação no Minerva. Compare níveis, conquistas e evolução na plataforma.",
    },
};

export default async function RankingPage() {
    const { message, success, users } = await listUserRanking();

    return (
        <>
            <Header />
            <H1 title="Ranking" />
            <section className="max-w-[800px] mx-auto w-full p-3">
                <ul className="flex flex-col gap-4">
                    {success ? (
                        users.map((user, index) => (
                            <li
                                key={index}
                                className="bg-plum text-lavender-blush sm:text-2xl text-md p-4 rounded-xl"
                            >
                                <Link
                                    href={`/users/${user.username}`}
                                    className="flex justify-between items-center"
                                >
                                    <div className="flex gap-4 items-center">
                                        <span className="font-bold sm:text-3xl text-xl">
                                            {index + 1}°
                                        </span>
                                        <span>@{user.username}</span>
                                    </div>
                                    <span>{user.semanalXP}XP</span>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>{message}</p>
                    )}
                </ul>
            </section>
        </>
    );
}
