import ExercisesAdmin from "@/components/admin/ExercisesAdmin";
import H1 from "@/components/layout/H1";
import { getLessonById } from "@/lib/api/lessons";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Exercícios - Painel Administrativo | Minerva",
    description: "Área restrita para gerenciamento da plataforma Minerva.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function ExerciseAdminPage({
    params,
}: {
    params: Promise<{ lessonId: string }>;
}) {
    const { lessonId } = await params;
    const { lessonData: lesson } = await getLessonById(lessonId);
    const token = await getAuthToken();

    if (!lesson || !token) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title={`Editar Exercícios de "${lesson.name}"`} />
            <ExercisesAdmin lesson={lesson} token={token} />
        </section>
    );
}
