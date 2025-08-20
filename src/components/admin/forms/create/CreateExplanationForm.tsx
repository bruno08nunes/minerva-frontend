"use client";

import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";

export default async function CreateExplanationForm() {
    return (
        <form>
            <Input id="title" label="Título:" placeholder="Título" />
            <Textarea
                id="description"
                label="Descrição:"
                placeholder="Descrição"
            />
            <Input id="content" label="Conteúdo:" placeholder="Conteúdo" />
            <Input id="topicId" label="Tópico:" placeholder="Tópico" />
            <Input id="title" label="Título:" placeholder="Título" />
            <Button text="Criar" />
        </form>
    );
}
