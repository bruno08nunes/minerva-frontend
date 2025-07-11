import type { Icon } from "./icon";
import type { Progress } from "./progress";
import type { Theme } from "./theme";
import type { Topic } from "./topic";

export interface Lesson {
    id: string;
    name: string;
    description: string;
    rewardXP: number;
    order: number;
    exercises: Exercise[];
    topic: Topic;
    topicId: string;
    theme: Theme;
    themeId: string;
    Progress?: Progress[];
    iconId: string;
    icon: Icon;
}
