import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { listUserRanking } from "@/lib/api/user";
import Link from "next/link";

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
                                <Link href={`/users/${user.username}`} className="flex justify-between items-center">
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
