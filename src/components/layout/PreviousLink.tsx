import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function PreviousLink({ url }: { url: string }) {
    return (
        <Link href={url} className="flex-1">
            <ArrowLeft
                color="#D3B1C2"
                size={45}
                className="border-2 border-lavender-blush p-2 rounded-full"
            />
        </Link>
    );
}
