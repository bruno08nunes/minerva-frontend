import Dexie, { Entity, type EntityTable } from "dexie";

class ProgressIDB extends Entity<MinervaDatabase> {
    id!: string;
    lessonOrder!: number;
    themeId!: string;
    topicId!: string;
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
