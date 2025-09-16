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

    console.log(lesson);

    return (
        <section className="w-full">
            <H1 title={`Editar Exercícios de "${lesson.name}"`} />
            <div className="flex flex-col gap-3">
                {lesson.exercises.map((exercise) => (
                    <div
                        className="text-lavender-blush bg-plum p-4 rounded-md flex gap-3 items-center text-xl"
                        key={exercise.order}
                    >
                        <span>{exercise.order}°</span>
                        <p className="line-clamp-2">{exercise.content[0].data}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
