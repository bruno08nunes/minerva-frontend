import ChoicesAdmin from "@/components/admin/ChoicesAdmin";
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
                href={"/admin/explanations/create"}
                className="w-full bg-plum text-lavender-blush p-4 rounded-md text-center text-xl"
            >
                Criar Escolha
            </Link>
            <ChoicesAdmin token={token} exercise={exercise} /> 
        </section>
    );
}
