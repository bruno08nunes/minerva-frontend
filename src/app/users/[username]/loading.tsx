import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/logo-low-quality.png";

export default function LoadingUserPage() {
    return (
        <>
            <header
                className={`bg-plum flex justify-between items-center p-4 top-0 z-10`}
            >
                <Link href={"/"}>
                    <Image
                        src={logo}
                        alt="Logo"
                        className="md:w-[100px] sm:w-[80px] w-[65px]"
                    />
                </Link>
            </header>
            <div className="flex sm:flex-row flex-col gap-2 bg-plum w-full max-w-[800px] mx-auto mt-8 p-4 rounded-xl sm:items-center">
                <Skeleton className="max-w-25 rounded-full object-cover aspect-square self-center w-full" />
                <div className="flex flex-col gap-3 grow sm:text-xl text-lg text-lavender-blush">
                    <Skeleton className="h-8 max-w-[300px]" />
                    <Skeleton className="h-6 max-w-[250px]" />
                </div>
            </div>
        </>
    );
}
