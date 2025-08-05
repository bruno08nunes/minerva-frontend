import { updateLessonProgressIDB } from "@/lib/indexeddb/progress-idb";
import { toast } from "sonner";

export default async function winLessonIDB({
    themeId,
    topicId,
}: {
    themeId: string;
    topicId: string;
}) {
    const [err] = await updateLessonProgressIDB({
        themeId: themeId,
        topicId: topicId,
    });

    if (err) {
        toast.error("Erro ao salvar dados! Tente novamente mais tarde :(", {
            duration: 3000,
            position: "top-center",
            style: { color: "red" },
        });
    }
}
