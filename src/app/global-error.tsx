"use client";
import H1 from "@/components/layout/H1";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <head>
                <title>Erro - Minerva</title>
            </head>
            <body className="text-center text-lavender-blush text-xl">
                <H1 title="Erro!" />
                <h2 className="text-2xl mb-2">
                    Estamos passando por problemas! Tente novamente mais tarde.
                </h2>
                <p>{error.message}</p>
                <button
                    className="block w-max mx-auto my-4 border-current border py-2 px-3 hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => reset()}
                >
                    Tente novamente!
                </button>
            </body>
        </html>
    );
}
