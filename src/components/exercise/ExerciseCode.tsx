import { Fragment } from "react";
import { codeFont } from "@/lib/fonts";

function CodeInput({
    onChangeInputValue,
    inputValue,
}: Omit<ExerciseCodeProps, "content">) {
    // Todo: change this to a text area and update the size by the lenght of the answer
    return (
        <input
            type="text"
            className="border-0 outline-0 border-plum border-b-4 bg-[#0007] p-2"
            value={inputValue}
            onChange={(e) => onChangeInputValue(e.target.value)}
        />
    );
}

interface ExerciseCodeProps {
    content: string;
    onChangeInputValue(value: string): void;
    inputValue: string;
}

export default function ExerciseCode({
    content,
    inputValue,
    onChangeInputValue,
}: ExerciseCodeProps) {
    const codes = content === "_____" ? [] : content.split("_____");

    return (
        <pre
            className={`max-w-[800px] bg-[#ffffff03] rounded mx-auto mb-6 border-6 border-t-24 border-plum p-6 text-xl tracking-wider text-lavender-blush ${codeFont.className}`}
        >
            {codes.length !== 0 ? (
                codes.map((item, index) => {
                    if (!item) {
                        return null;
                    }
                    if (index === codes.length - 1) {
                        return <code key={index}>{item}</code>;
                    }
                    return (
                        <Fragment key={index}>
                            <code>{item}</code>
                            <CodeInput
                                inputValue={inputValue}
                                onChangeInputValue={onChangeInputValue}
                            />
                        </Fragment>
                    );
                })
            ) : (
                <CodeInput
                    inputValue={inputValue}
                    onChangeInputValue={onChangeInputValue}
                />
            )}
        </pre>
    );
}
