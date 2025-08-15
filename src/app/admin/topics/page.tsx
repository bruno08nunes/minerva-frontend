import H1 from "@/components/layout/H1";
import { listTopics } from "@/lib/api/topics";
import { env } from "@/lib/env";
import Image from "next/image";
import Link from "next/link";

export default async function AdminTopicsPage() {
    const { message, topicsData: topics, success } = await listTopics();

    return (
        <>
            <H1 title="Editar Tópicos" />
            <section className="flex flex-col gap-3">
                {success ? (
                    topics?.map((topic) => (
                        <Link
                            href={"/admin/topics/form/" + topic.slug}
                            key={topic.id}
                            className="w-full bg-plum text-lavender-blush p-2 rounded-md flex gap-2 items-center text-xl"
                        >
                            <Image
                                src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${topic.icon.url}`}
                                alt=""
                                className="max-w-[100px]"
                                width={400}
                                height={400}
                            />
                            <div>
                                <div className="flex gap-2 items-baseline">
                                    <span className="font-bold text-2xl">{topic.name}</span>
                                    <span className="italic">{topic.slug}</span>
                                </div>
                                <p>{topic.description}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>{message}</p>
                )}
            </section>
        </>
    );
}
