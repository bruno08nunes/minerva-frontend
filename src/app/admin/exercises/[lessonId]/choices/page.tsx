import H1 from "@/components/layout/H1";
import { getExerciseById } from "@/lib/api/exercises";
import getAuthToken from "@/lib/token";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ChoicesAdminPage({
    params,
}: {
    params: Promise<{ lessonId: string }>;
}) {
    const { lessonId: exerciseId } = await params;
    const { exercise } = await getExerciseById(exerciseId);

    const token = await getAuthToken();

    if (!exercise || !token) {
        redirect("/admin");
    }

    return (
        <section className="w-full flex gap-4 flex-col">
            <H1 title="Alternativas" />
            <Link
                href={`/admin/exercises/${exerciseId}/choices/create`}
                className="w-full bg-plum text-lavender-blush p-4 rounded-md text-center text-xl"
            >
                Criar Escolha
            </Link>
            {exercise.choices.map((choice) => (
                <Link
                    href={"/admin/choice/" + choice.id}
                    className="text-lavender-blush bg-plum p-4 rounded-md flex gap-3 items-center text-xl"
                    key={choice.order}
                >
                    <span>{choice.order}°</span>
                    <p className="line-clamp-2">{choice.text}</p>
                </Link>
            ))}
        </section>
    );
}
