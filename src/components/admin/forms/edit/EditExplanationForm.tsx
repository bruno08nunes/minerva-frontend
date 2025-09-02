import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import { Explanation } from "@/types/explanation";
import { parseMarkdownToText } from "@/utils/parseMarkdown";

export default function EditExplanationForm({
    explanation,
    token,
}: {
    explanation: Explanation;
    token: string;
}) {
    const content = parseMarkdownToText(explanation?.content ?? []);

    return (
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
    );
}
