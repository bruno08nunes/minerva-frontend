import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface FigureProps {
    image: StaticImport;
    isColored?: boolean;
    title: string
}

export default function Figure({ image, isColored, title }: FigureProps) {
    return (
        <figure
            className={`flex flex-1 flex-col gap-8 items-center md:py-10 py-4 md:px-4 px-1 md:text-4xl text-xl font-bold text-center ${
                isColored && "bg-[#613659] rounded"
            }`}
        >
            <figcaption>{title}</figcaption>
            <Image
                src={image}
                alt=""
                className="max-w-[200px] w-[70%] aspect-square object-cover"
            />
        </figure>
    );
}
