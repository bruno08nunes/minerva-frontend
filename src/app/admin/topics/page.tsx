import H1 from "@/components/layout/H1";
import { listTopics } from "@/lib/api/topics";
import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";

export default async function AdminTopicsPage() {
    const { message, topicsData: topics, success } = await listTopics();
    const resetTopicCache = async () => {
        "use server";

        revalidateTag("topics");
    };

    return (
        <>
            <H1 title="Editar Tópicos" />
            <section className="flex flex-col gap-3">
                <Link
                    href={"/admin/topics/form/create"}
                    className="w-full bg-plum text-lavender-blush p-4 rounded-md text-center text-xl"
                >
                    Criar Tópico
                </Link>
                <button
                    className="w-full bg-plum text-lavender-blush p-4 rounded-md text-center text-xl cursor-pointer"
                    onClick={resetTopicCache}
                >
                    Resetar Cache
                </button>
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
                                    <span className="font-bold text-2xl">
                                        {topic.name}
                                    </span>
                                    <span className="italic">
                                        {topic.slug} - {topic.order}°
                                    </span>
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
