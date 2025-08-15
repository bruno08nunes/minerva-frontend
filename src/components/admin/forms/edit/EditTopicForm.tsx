"use client";

import { editTopicAction } from "@/action/admin/edit/edit-topic-action";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import { Topic } from "@/types/topic";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import SetIconDialog from "../../SetIconDialog";
import { Icon } from "@/types/icon";

export default function EditTopicForm({
    topic,
    token,
    icons = [],
}: {
    topic?: Topic;
    token: string;
    icons?: Icon[];
}) {
    const [currentIcon, setCurrentIcon] = useState(topic?.icon as Icon | undefined);
    const [state, formAction] = useActionState(editTopicAction, {
        success: false,
        message: "",
    });

    useEffect(() => {
        if (state.message && state.success === false) {
            toast.error(state.message, {
                duration: 3000,
                position: "top-center",
                style: { color: "red" },
            });
        }

        if (state.success) {
            redirect("/admin/topics");
        }
    }, [state]);

    return (
        <form
            action={formAction}
            className="max-w-[700px] w-full mx-auto flex flex-col gap-6 px-5"
        >
            <SetIconDialog
                icons={icons}
                currentIcon={currentIcon}
                setCurrentIcon={setCurrentIcon}
            />
            <div className="flex gap-4 flex-col sm:flex-row">
                <Input
                    id="name"
                    label="Nome do tema:"
                    placeholder="Nome"
                    defaultValue={topic?.name}
                />
                <Input
                    id="slug"
                    label="Identificador:"
                    placeholder="Slug"
                    defaultValue={topic?.slug}
                />
            </div>
            <Textarea
                id="description"
                label="Descrição:"
                placeholder="Descrição"
                defaultValue={topic?.description}
            />
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="topicId" value={topic?.id ?? ""} />
            <input type="hidden" name="iconId" value={currentIcon?.id ?? ""} />
            <Button text="Editar" />
        </form>
    );
}
