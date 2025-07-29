import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";

export default async function RankingPage() {
    return (
        <>
            <Header />
            <H1 title="Ranking" />
            <section className="max-w-[800px] mx-auto w-full">
                <ul className="flex flex-col gap-4">
                    <li className="bg-plum text-lavender-blush text-2xl p-4 rounded-xl flex justify-between">
                        <div className="flex gap-4">
                            <span>Posição</span>
                            <span>Nome</span>
                        </div>
                        <span>XP Semanal</span>
                    </li>
                </ul>
            </section>
        </>
    );
}
