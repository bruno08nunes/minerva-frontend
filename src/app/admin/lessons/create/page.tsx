import CreateLessonForm from "@/components/admin/forms/create/CreateLessonForm";
import H1 from "@/components/layout/H1";
import { listThemes } from "@/lib/api/themes";
import { listTopics } from "@/lib/api/topics";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function CreateExplanationAdminPage() {
    const token = await getAuthToken();
    const { topicsData: topics } = await listTopics();
    const { themesData: themes } = await listThemes();

    if (!topics || !themes || !token) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title="Criar Lição" />
            <CreateLessonForm topics={topics} themes={themes} token={token} />
        </section>
    )
}