import { Fragment } from "react";
import { codeFont } from "@/lib/fonts";

function CodeInput({
    onChangeInputValue,
    inputValue,
    disabled = false,
    submit
}: Omit<ExerciseCodeProps, "content">) {
    return (
        <input
            type="text"
            className={`border-0 outline-0 border-plum border-b-4 bg-[#0007] p-2 ${disabled && "bg-transparent cursor-not-allowed"}`}
            value={inputValue}
            onChange={(e) => onChangeInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submit() }}
            disabled={disabled}
            autoFocus
        />
    );
}

interface ExerciseCodeProps {
    content: string;
    onChangeInputValue(value: string): void;
    inputValue: string;
    disabled?: boolean;
    submit: () => void;
}

export default function ExerciseCode({
    content,
    inputValue,
    onChangeInputValue,
    disabled = false,
    submit
}: ExerciseCodeProps) {
    const codes = content === "_____" ? [] : content.split("_____");

    return (
        <pre
            className={`max-w-[800px] bg-[#ffffff03] rounded mx-auto mb-6 border-6 border-t-24 border-plum p-6 sm:text-xl text-md text-wrap tracking-wider text-lavender-blush ${codeFont.className}`}
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
                                disabled={disabled}
                                submit={submit}
                            />
                        </Fragment>
                    );
                })
            ) : (
                <CodeInput
                    inputValue={inputValue}
                    onChangeInputValue={onChangeInputValue}
                    disabled={disabled}
                    submit={submit}
                />
            )}
        </pre>
    );
}
