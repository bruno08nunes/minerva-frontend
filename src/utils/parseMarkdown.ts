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
