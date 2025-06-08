import Figure from "@/components/Figure";
import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { env } from "@/lib/env";
import { Themes } from "@/types/themes";
import Link from "next/link";

interface ThemesListReponse {
    success: boolean;
    message: string;
    data: Themes[];
}

export default async function ThemesPage() {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/themes`);
    const { data, message, success }: ThemesListReponse = await response.json();

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
                            {data.map((item) => (
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
