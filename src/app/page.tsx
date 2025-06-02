import Header from "@/components/Header";
import Image from "next/image";
import image from "../../public/minerva.png";

export default function Home() {
    return (
        <>
            <section className=" flex justify-evenly items-center text-center text-xl p-8 min-h-[70vh] bg-[rgba(255, 255, 255, 0.18)] backdrop-blur-sm border-1 border-[rgba(255, 255, 255, 0.18)]">
                <Image src={image} alt="" className="max-w-[350px] w-[30%]" />
                <div className="flex flex-col gap-8 text-white items-center">
                    <h1 className="font-normal">Minerva - Estudo de Lógica para Jovens</h1>
                    <p>Aprenda Programação Enquanto Se Diverte!</p>
                    <div className="flex flex-col gap-4">
                        <a href="pages/register.html" className="text-black bg-[#D3B1C2] border-1 border-[#D3B1C2] rounded-3xl w-[300px] p-2.5 decoration-0 transition-[.4s] hover:scale-[1.05]">
                            Começar Agora
                        </a>
                        <a
                            href="pages/login.html"
                            className="text-[#D3B1C2] bg-transparent border-1 border-[#D3B1C2] rounded-3xl w-[300px] p-2.5 decoration-0 transition-[.4s] hover:scale-[1.05]"
                        >
                            Já Possuo uma Conta
                        </a>
                    </div>
                </div>
            </section>
            <Header />
        </>
    );
}
