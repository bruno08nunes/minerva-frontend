import { db } from ".";

export async function updateLessonProgressIDB({
    themeId,
    topicId,
}: {
    themeId: string;
    topicId: string;
}) {
    try {
        const id = `${themeId}_${topicId}`;

        return await db.transaction("rw", db.progress, async () => {
            const current = await db.progress.get(id);
            if (current) {
                current.lessonOrder += 1;
                await db.progress.put(current);
                return [null, current.lessonOrder];
            }

            await db.progress.put({
                id,
                themeId,
                topicId,
                lessonOrder: 1,
            });

            return [null, 1];
        });
    } catch (err) {
        console.log("Erro ao salvar dados localmente", err);
        return [err];
    }
}

export async function getLastCompletedLesson({
    themeId,
    topicId,
}: {
    themeId: string;
    topicId: string;
}) {
    const id = `${themeId}_${topicId}`;

    return (await db.progress.get(id))?.lessonOrder ?? 0;
}

export async function checkIfHasProgressIDB() {
    const first = await db.progress.toCollection().first();
    return !!first;
}
