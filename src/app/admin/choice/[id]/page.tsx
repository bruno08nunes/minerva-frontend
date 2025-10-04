import EditChoiceForm from "@/components/admin/forms/edit/EditChoiceForm";
import H1 from "@/components/layout/H1";
import { getChoiceById } from "@/lib/api/choice";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function EditChoiceAdminPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { choice } = await getChoiceById(id);
    const token = await getAuthToken();

    if (!choice || !token) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title={`Editar Exercício`} />
            <EditChoiceForm choice={choice} token={token} />
        </section>
    );
}
