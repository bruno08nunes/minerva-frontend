import type { Choice } from "./choice";

export interface Exercise {
    id: string;
    statement: string;
    order: number;
    type: "MULTIPLE_CHOICE" | "WRITE_CODE" | "COMPLETE_CODE";
    hint: string;
    lessonId: string;
    choices: Choice[]
}