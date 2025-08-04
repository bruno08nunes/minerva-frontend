import H1 from "@/components/layout/H1";
import LoadingHeader from "@/components/layout/LoadingHeader";
import Image from "next/image";
import image from "../../../public/programming2-low-quality.png";
import { LoaderCircle } from "lucide-react";

export default function LoadingExplanationsPage() {
    return (
        <>
            <LoadingHeader />
            <main>
                <H1 title="Explicações" />
                <section className="max-w-[600px] mx-auto flex gap-10 text-lavender-blush text-justify [text-align-last:center] sm:text-xl text-lg items-center p-4">
                    <Image
                        src={image}
                        alt=""
                        className="max-w-[200px] hidden sm:block w-full"
                    />
                    <p>
                        Está com dúvida sobre os conceitos aprendidos? Veja mais
                        sobre eles aqui! Eles são separados por tópicos da mesma
                        forma que os desafios, para que você encontre-os mais
                        fácil.
                    </p>
                </section>
                <LoaderCircle
                    color="#D3B1C2"
                    size={100}
                    className="animate-spin mx-auto"
                />
            </main>
        </>
    );
}
