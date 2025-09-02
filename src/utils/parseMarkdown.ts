import { Explanation } from "@/types/explanation";

export function parseMarkdownLike(text: string) {
    const lines = text.split("\n");
    const blocks: { type: "paragraph" | "code"; data: string }[] = [];

    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    for (const line of lines) {
        if (line.trim().startsWith("```")) {
            // Toggle code block
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBuffer = [];
            } else {
                // close code block
                blocks.push({ type: "code", data: codeBuffer.join("\n") });
                inCodeBlock = false;
            }
        } else if (inCodeBlock) {
            codeBuffer.push(line);
        } else if (line.trim() !== "") {
            blocks.push({ type: "paragraph", data: line });
        }
    }

    return blocks;
}

export function parseMarkdownToText(markdownArray: Explanation["content"]) {
    let text = "";

    for (let i = 0; i < markdownArray.length; i++) {
        const line = markdownArray[i];

        if (line.type === "paragraph") {
            text += line.data;

            if (!(i + 1 === markdownArray.length)) {
                text += "\n\n"
            }

            continue;
        }

        if (line.type === "code") {
            text += "```\n" + line.data

            if (!(i + 1 === markdownArray.length)) {
                text += "\n```\n\n";
            }
        }
    }

    return text;
}