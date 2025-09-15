import H1 from "@/components/layout/H1";
import { getLessonById } from "@/lib/api/lessons";
import { redirect } from "next/navigation";

export default async function EditFormLessonAdminPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const {lessonData: lesson} = await getLessonById(id);

    if (!lesson) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title={`Editar ${lesson.name}`} />
        </section>
    );
}
