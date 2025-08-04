import LoadingHeader from "@/components/layout/LoadingHeader";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingUserPage() {
    return (
        <>
            <LoadingHeader />
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
