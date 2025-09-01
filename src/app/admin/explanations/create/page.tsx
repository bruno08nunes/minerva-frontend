import CreateExplanationForm from "@/components/admin/forms/create/CreateExplanationForm";
import H1 from "@/components/layout/H1";
import getAuthToken from "@/lib/token";

export default async function CreateExplanationAdminPage() {
    const token = await getAuthToken();

    return (
        <section className="w-full">
            <H1 title="Criar Explicação" />
            <CreateExplanationForm token={token!} />
        </section>
    )
}