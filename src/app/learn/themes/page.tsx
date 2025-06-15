import Figure from "@/components/Figure";
import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { listThemes } from "@/lib/api/themes";
import { env } from "@/lib/env";
import Link from "next/link";

export default async function ThemesPage() {
    const { themesData, success, message } = await listThemes();

    return (
        <>
            <Header />
            <main className="max-w-[800px] mx-auto px-8 pb-4">
                <H1 title="Temas" />
                <p className="text-white sm:text-[22px] text-lg p-4">
                    Você pode desenvolver suas habilidades em programação
                    concluindo desafios de temas de seus interesse.
                </p>
                <section className="grid sm:grid-cols-3 gap-8">
                    {success ? (
                        <>
                            {themesData!.map((item) => (
                                <Link href={`/learn/topics/${item.slug}`} key={item.id} className="sm:block grid grid-cols-[150px_minmax(0,_1fr)] items-center">
                                    <Figure
                                        image={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${item.icon.url}`}
                                        title={item.name}
                                        isColored
                                    />
                                    <p className="text-white sm:text-lg p-2 text-justify">{item.description}</p>
                                </Link>
                            ))}
                        </>
                    ) : (
                        <p>{message}</p>
                    )}
                </section>
            </main>
        </>
    );
}
