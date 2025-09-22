import H1 from "@/components/layout/H1";

export default async function ExerciseFormAdminPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <section className="w-full">
            <H1 title={`Editar Exercícios de "${"TESTE"}"`} />
        </section>
    )
}