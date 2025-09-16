import EditLessonForm from "@/components/admin/forms/edit/EditLessonForm";
import H1 from "@/components/layout/H1";
import { getLessonById } from "@/lib/api/lessons";
import { listThemes } from "@/lib/api/themes";
import { listTopics } from "@/lib/api/topics";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function EditFormLessonAdminPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { lessonData: lesson } = await getLessonById(id);
    const { topicsData: topics } = await listTopics();
    const { themesData: themes } = await listThemes();
    const token = await getAuthToken();

    if (!topics || !themes || !token || !lesson) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title={`Editar ${lesson.name}`} />
            <EditLessonForm lesson={lesson} themes={themes} topics={topics} token={token} />
        </section>
    );
}
