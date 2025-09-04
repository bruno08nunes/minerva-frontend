import CreateExplanationForm from "@/components/admin/forms/create/CreateExplanationForm";
import H1 from "@/components/layout/H1";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import { listThemes } from "@/lib/api/themes";
import { listTopics } from "@/lib/api/topics";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function CreateExplanationAdminPage() {
    const token = await getAuthToken();
    const { topicsData: topics } = await listTopics();
    const { themesData: themes } = await listThemes();

    if (!topics || !themes) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title="Criar Lição" />
            <form className="flex flex-col gap-4 justify-center">
                <Input id="name" label="Nome:" placeholder="Nome" />
                <Textarea id="description" label="Descrição:" placeholder="Descrição" />
                <Input id="rewardXP" label="XP de Recompensa:" placeholder="XP de Recompensa" />
                <Input id="order" label="Ordem:" placeholder="Ordem" />
                <Input id="topicId" />
                <Input id="themeId" />
            </form>
        </section>
    )
}