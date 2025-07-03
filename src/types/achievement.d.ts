import { Icon } from "next/dist/lib/metadata/types/metadata-types";

export interface Achievement {
    userId: string;
    achievementId: string;
    achievedAt: Date;
    achievement: {
        id: string;
        name: string;
        description: string;
        iconId: string;
        icon: Icon;
    }
}