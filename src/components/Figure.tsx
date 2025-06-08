/* eslint-disable jsx-a11y/alt-text */
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface FigureProps {
    image: StaticImport | string;
    isColored?: boolean;
    title: string
}

export default function Figure({ image, isColored, title }: FigureProps) {
    const imageProps = {
        src: image,
        alt: "",
        className: "max-w-[200px] w-[70%] aspect-square object-cover",
        width: typeof image === "string" ? 400 : undefined,
        height: typeof image === "string" ? 400 : undefined
    }

    return (
        <figure
            className={`flex flex-1 flex-col gap-8 items-center md:py-10 py-4 md:px-4 px-1 md:text-3xl text-lg font-bold text-center ${
                isColored && "bg-plum rounded"
            }`}
        >
            <figcaption className="text-lavender-blush">{title}</figcaption>
            <Image
                {...imageProps}
            />
        </figure>
    );
}
