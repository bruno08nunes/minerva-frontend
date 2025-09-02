import { Topic } from "./topic";

export interface Explanation {
    id: string;
    title: string;
    description: string;
    content: { type: "paragraph" | "code", data: string }[];
    topicId: string;
    topic: Topic;
    createdAt: string;
    updatedAt: string;
}
