import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { listUserRanking } from "@/lib/api/user";

export default async function RankingPage() {
    const { message, success, users } = await listUserRanking();

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
