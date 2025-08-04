import H1 from "@/components/layout/H1";
import LoadingHeader from "@/components/layout/LoadingHeader";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingFigure() {
    return (
        <div className="sm:block grid grid-cols-[150px_minmax(0,_1fr)] items-center">
            <div
                className={`flex flex-1 flex-col gap-8 items-center md:py-10 py-4 md:px-4 px-1 md:text-3xl text-lg font-bold text-center bg-plum rounded
                            }`}
            >
                <p className="text-lavender-blush">Carregando</p>
                <Skeleton className="aspect-square max-w-[200px] w-[70%] object-cover" />
            </div>
        </div>
    );
}

export default function LoadingThemesPage() {
    return (
        <>
            <LoadingHeader />
            <main className="max-w-[800px] mx-auto px-8 pb-4">
                <H1 title="Temas" />
                <p className="text-white sm:text-[22px] text-lg p-4">
                    Você pode desenvolver suas habilidades em programação
                    concluindo desafios de temas de seus interesse.
                </p>
                <section className="grid sm:grid-cols-3 gap-8">
                    <LoadingFigure />
                    <LoadingFigure />
                    <LoadingFigure />
                </section>
            </main>
        </>
    );
}
