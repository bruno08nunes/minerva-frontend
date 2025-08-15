import EditTopicForm from "@/components/admin/forms/EditTopicForm";
import H1 from "@/components/layout/H1";
import listIcons from "@/lib/api/icons";
import { getTopicBySlug } from "@/lib/api/topics";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function AdminTopicForm({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const token = await getAuthToken();

    if (!token) {
        redirect("/");
    }

    const { id: slug } = await params;
    const { topic } = await getTopicBySlug(slug);
    const { data: icons } = await listIcons();

    return (
        <section className="w-full">
            <H1 title="Editar Tópico" />
            <EditTopicForm token={token} topic={topic} icons={icons} />
        </section>
    );
}
