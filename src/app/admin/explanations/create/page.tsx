import CreateExplanationForm from "@/components/admin/forms/create/CreateExplanationForm";
import H1 from "@/components/layout/H1";
import { listTopics } from "@/lib/api/topics";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function CreateExplanationAdminPage() {
    const token = await getAuthToken();
    const { topicsData: topics } = await listTopics();

    if (!topics) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title="Criar Explicação" />
            <CreateExplanationForm token={token!} topics={topics} />
        </section>
    )
}