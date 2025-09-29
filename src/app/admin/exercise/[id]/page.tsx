import EditExerciseForm from "@/components/admin/forms/edit/EditExerciseForm";
import H1 from "@/components/layout/H1";
import { getExerciseById } from "@/lib/api/exercises";
import { redirect } from "next/navigation";

export default async function ExerciseFormAdminPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { exercise } = await getExerciseById(id);

    if (!exercise) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title={`Editar Exercício`} />
            <EditExerciseForm exercise={exercise} />
        </section>
    );
}
