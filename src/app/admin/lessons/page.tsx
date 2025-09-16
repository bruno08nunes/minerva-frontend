import H1 from "@/components/layout/H1";
import { listAllLessons } from "@/lib/api/lessons";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/lib/env";

export default async function LessonnAdminPage() {
    const { message, success, lessonsData: data } = await listAllLessons();

    const resetLessonsCache = async () => {
        "use server";

        revalidateTag("lessons");
    };

    return (
        <section className="w-full flex gap-4 flex-col">
            <H1 title="Lições" />
            <Link
                href={"/admin/lessons/create"}
                className="w-full bg-plum text-lavender-blush p-4 rounded-md text-center text-xl"
            >
                Criar Lição
            </Link>
            <button
                className="w-full bg-plum text-lavender-blush p-4 rounded-md text-center text-xl cursor-pointer"
                onClick={resetLessonsCache}
            >
                Resetar Cache
            </button>
            {success ? (
                data?.map((lesson) => (
                    <Link
                        href={`/admin/lessons/update/${lesson.id}`}
                        key={lesson.id}
                        className="w-full bg-plum text-lavender-blush p-2 rounded-md flex gap-2 items-center text-xl"
                    >
                        <Image
                            src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${lesson.theme.icon.url}`}
                            alt={lesson.description ?? ""}
                            className="max-w-[100px]"
                            width={400}
                            height={400}
                        />
                        <Image
                            src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${lesson.topic.icon.url}`}
                            alt={lesson.description ?? ""}
                            className="max-w-[100px]"
                            width={400}
                            height={400}
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="font-bold text-2xl">{lesson.name}</h2>
                            <p>{lesson.description ?? "Sem descrição"}</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p>{message}</p>
            )}
        </section>
    );
}
