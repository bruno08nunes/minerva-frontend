import CreateExerciseForm from "@/components/admin/forms/create/CreateExerciseForm";
import H1 from "@/components/layout/H1";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function CreateExerciseAdminPage({
    params,
}: {
    params: Promise<{ lessonId: string }>;
}) {
    const { lessonId } = await params;
    const token = await getAuthToken();

    if (!token) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title={`Criar Exercício`} />
            <CreateExerciseForm token={token} lessonId={lessonId} />
        </section>
    );
}