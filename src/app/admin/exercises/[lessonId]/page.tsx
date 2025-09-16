import ExercisesAdmin from "@/components/admin/ExercisesAdmin";
import H1 from "@/components/layout/H1";
import { getLessonById } from "@/lib/api/lessons";
import { redirect } from "next/navigation";

export default async function ExerciseAdminPage({
    params,
}: {
    params: Promise<{ lessonId: string }>;
}) {
    const { lessonId } = await params;
    const { lessonData: lesson } = await getLessonById(lessonId);

    if (!lesson) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title={`Editar Exercícios de "${lesson.name}"`} />
            <ExercisesAdmin lesson={lesson} />
        </section>
    );
}
