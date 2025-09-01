import CreateExplanationForm from "@/components/admin/forms/create/CreateExplanationForm";
import H1 from "@/components/layout/H1";

export default async function CreateExplanationAdminPage() {
    return (
        <section className="w-full">
            <H1 title="Criar Explicação" />
            <CreateExplanationForm />
        </section>
    )
}