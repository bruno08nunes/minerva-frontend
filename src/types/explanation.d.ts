import { Topic } from "./topic";

export interface Explanation {
    id: string;
    title: string;
    description: string;
    content: Record<string, string>[];
    topicId: string;
    topic: Topic;
    createdAt: string;
    updatedAt: string;
}
