import H1 from "@/components/layout/H1";
import { listExplanations } from "@/lib/api/explanations";
import { env } from "@/lib/env";
import Image from "next/image";
import Link from "next/link";

export default async function ExplanationsAdminPage() {
    const { message, success, data } = await listExplanations();

    return (
        <section className="w-full flex gap-4 flex-col">
            <H1 title="Explicações" />
            <Link
                href={"/admin/explanations/create"}
                className="w-full bg-plum text-lavender-blush p-4 rounded-md text-center text-xl"
            >
                Criar Explicação
            </Link>
            {success ? (
                data?.map((explanation) => (
                    <Link
                        href={`/admin/explanations/update/${explanation.id}`}
                        key={explanation.id}
                        className="w-full bg-plum text-lavender-blush p-3 rounded-md flex gap-2 items-center text-xl"
                    >
                        <Image
                            src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${explanation.topic.icon.url}`}
                            alt={explanation.description ?? ""}
                            width={400}
                            height={400}
                            className="max-w-[100px]"
                        />
                        <div>
                            <h2>{explanation.title}</h2>
                            <p className="line-clamp-2">{explanation.description ?? "Sem descrição"}</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p>{message}</p>
            )}
        </section>
    );
}
