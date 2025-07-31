import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { env } from "@/lib/env";
import { User } from "@/types/user";

export default async function RankingPage() {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/ranking`, {
        cache: "force-cache",
        next: {
            revalidate: 60 * 60,
        },
    });
    const {
        message,
        success,
        users,
    }: {
        message: string;
        success: boolean;
        users: User[];
    } = await res.json();

    return (
        <>
            <Header />
            <H1 title="Ranking" />
            <section className="max-w-[800px] mx-auto w-full">
                <ul className="flex flex-col gap-4">
                    {success ? (
                        users.map((user, index) => (
                            <li
                                key={index}
                                className="bg-plum text-lavender-blush text-2xl p-4 rounded-xl flex justify-between items-center"
                            >
                                <div className="flex gap-4 items-center">
                                    <span className="font-bold text-3xl">
                                        {index + 1}°
                                    </span>
                                    <span>@{user.username}</span>
                                </div>
                                <span>{user.semanalXP}XP Semanal</span>
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
