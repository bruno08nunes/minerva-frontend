import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import H1 from "@/components/layout/H1";
import { getExplanationById } from "@/lib/api/explanations";
import getAuthToken from "@/lib/token";
import { parseMarkdownToText } from "@/utils/parseMarkdown";

export default async function UpdateExplanationAdminPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const token = await getAuthToken();
    const { data: explanation } = await getExplanationById({ id });
    const content = parseMarkdownToText(explanation?.content ?? []);

    return (
        <section className="w-full">
            <H1 title="Editar Explicação" />
            <form className="flex flex-col gap-4 justify-center">
                <Input
                    id="title"
                    label="Título:"
                    placeholder="Título"
                    defaultValue={explanation?.title}
                />
                <Textarea
                    id="description"
                    label="Descrição:"
                    placeholder="Descrição"
                    defaultValue={explanation?.description}
                />
                <Textarea
                    id="content"
                    label="Conteúdo:"
                    placeholder="Conteúdo"
                    defaultValue={content}
                />
                <Input
                    id="topicId"
                    label="Tópico:"
                    placeholder="Tópico"
                    defaultValue={explanation?.topicId}
                />
                <input type="hidden" name="id" value={explanation?.id} />
                <input type="hidden" name="token" value={token} />
                <Button text="Editar" />
            </form>
        </section>
    );
}
