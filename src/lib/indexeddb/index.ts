import Dexie, { Entity, type EntityTable } from "dexie";

class ProgressIDB extends Entity<MinervaDatabase> {
    id!: string;
    lessonOrder!: number;
    themeId!: string;
    topicId!: string;

    async updateLessonProgress({
        themeId,
        topicId,
    }: {
        themeId: string;
        topicId: string;
    }) {
        const id = `${themeId}_${topicId}`;

        return await this.db.transaction("rw", this.db.progress, async () => {
            const current = await this.db.progress.get(id);
            if (current) {
                current.lessonOrder += 1;
                await this.db.progress.put(current);
                return current.lessonOrder;
            }

            await this.db.progress.put({
                id,
                themeId,
                topicId,
                lessonOrder: 1,
            });

            return 1;
        });
    }
}

class MinervaDatabase extends Dexie {
    progress!: EntityTable<ProgressIDB, "id">;

    constructor() {
        super("MinervaDatabase");
        this.version(1).stores({
            progress: "id",
        });
        this.progress.mapToClass(ProgressIDB);
    }
}

export const db = new MinervaDatabase();
