import H1 from "@/components/layout/H1";
import { getLessonById } from "@/lib/api/lessons";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditLessonAdminPage ({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { lessonData: lesson } = await getLessonById(id);

    if (!lesson) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title={`${lesson.name}`} />
            <div className="flex gap-3 justify-center">
                <Link
                    href={`/admin/lessons/update/${id}/form`}
                    className="px-3 py-1 bg-plum text-lavender-blush rounded-md"
                >
                    Editar Lição
                </Link>
                <Link
                    href={`/admin/lessons/update/${id}/form`}
                    className="px-3 py-1 bg-plum text-lavender-blush rounded-md"
                >
                    Editar Exercícios da Lição
                </Link>
            </div>
        </section>
    );
}
