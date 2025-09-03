import EditExplanationForm from "@/components/admin/forms/edit/EditExplanationForm";
import H1 from "@/components/layout/H1";
import { getExplanationById } from "@/lib/api/explanations";
import { listTopics } from "@/lib/api/topics";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function UpdateExplanationAdminPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const token = await getAuthToken();
    const { data: explanation } = await getExplanationById({ id });

    if (!explanation) {
        redirect("/admin/explanations");
    }

    const { topicsData: topics } = await listTopics();

    if (!topics) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title="Editar Explicação" />
            <EditExplanationForm token={token!} explanation={explanation} topics={topics} />
        </section>
    );
}
