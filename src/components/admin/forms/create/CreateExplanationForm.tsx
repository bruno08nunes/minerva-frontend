"use client";

import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";

function parseMarkdownLike(text: string) {
    const lines = text.split("\n");
    const blocks: { type: "paragraph" | "code"; data: string }[] = [];
    console.log(lines);
    console.log(blocks);

    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    for (const line of lines) {
        if (line.trim().startsWith("```")) {
            // Toggle code block
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBuffer = [];
            } else {
                // close code block
                blocks.push({ type: "code", data: codeBuffer.join("\n") });
                inCodeBlock = false;
            }
        } else if (inCodeBlock) {
            codeBuffer.push(line);
        } else if (line.trim() !== "") {
            blocks.push({ type: "paragraph", data: line });
        }
    }

    return blocks;
}

export default function CreateExplanationForm() {
    const createExplanationAction = (e: any) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const content = formData.get("content")?.toString();
        const blocks = parseMarkdownLike(content!);
        console.log(blocks);
    };

    return (
        <form className="flex flex-col gap-4 justify-center" onSubmit={createExplanationAction}>
            <Input id="title" label="Título:" placeholder="Título" />
            <Textarea
                id="description"
                label="Descrição:"
                placeholder="Descrição"
            />
            <Textarea id="content" label="Conteúdo:" placeholder="Conteúdo" />
            <Input id="topicId" label="Tópico:" placeholder="Tópico" />
            <Input id="title" label="Título:" placeholder="Título" />
            <Button text="Criar" />
        </form>
    );
}
