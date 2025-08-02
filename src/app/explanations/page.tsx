import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import Image from "next/image";
import image from "../../../public/programming2.png";
import { listTopics } from "@/lib/api/topics";
import { env } from "@/lib/env";
import Link from "next/link";

export default async function ExplanationsPage() {
    const { success, message, topicsData: topics } = await listTopics();

    return (
        <>
            <Header />
            <main>
                <H1 title="Explicações" />
                <section className="max-w-[600px] mx-auto flex gap-10 text-lavender-blush text-justify [text-align-last:center] sm:text-xl text-lg items-center p-4">
                    <Image
                        src={image}
                        alt=""
                        className="max-w-[200px] hidden sm:block"
                    />
                    <p>
                        Está com dúvida sobre os conceitos aprendidos? Veja mais
                        sobre eles aqui! Eles são separados por tópicos da mesma
                        forma que os desafios, para que você encontre-os mais
                        fácil.
                    </p>
                </section>
                <section className="max-w-[800px] grid gap-y-8 sm:grid-cols-2 grid-cols-1 mx-auto p-4">
                    {success ? (
                        topics!.map((topic) => (
                            <Link
                                href={`/explanations/${topic.slug}`}
                                key={topic.id}
                                className="flex sm:gap-10 gap-4 items-center text-lavender-blush text-lg text-center"
                            >
                                <Image
                                    src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${topic.icon.url}`}
                                    alt=""
                                    width={400}
                                    height={400}
                                    className="max-w-[100px] rounded-full"
                                />
                                <p className="mb-4 text-xl font-bold">
                                    {topic.name}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <p>{message}</p>
                    )}
                </section>
            </main>
        </>
    );
}
