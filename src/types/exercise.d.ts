import type { Choice } from "./choice";

export interface Exercise {
    id: string;
    content: [
        {
            type: "paragraph" | "code";
            data: string;
        }
    ];
    order: number;
    type: "MULTIPLE_CHOICE" | "WRITE_CODE" | "COMPLETE_CODE";
    hint: string;
    lessonId: string;
    choices: Choice[]
}