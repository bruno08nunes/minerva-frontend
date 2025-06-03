import Header from "@/components/Header";
import Image from "next/image";
import heroImage from "../../public/pc.png";
import freeLearnImage from "../../public/idea.png";
import programmingImage from "../../public/programming.png";
import gamificationImage from "../../public/gameplay.png";
import rankingImage from "../../public/podium.png";
import achievementImage from "../../public/winner.png";

import rpgImage from "../../public/theme_placeholder/d20.png";
import detectiveImage from "../../public/theme_placeholder/detective.png";
import horrorImage from "../../public/theme_placeholder/horror.png";
import Figure from "@/components/Figure";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <section className="flex justify-evenly items-center text-center text-xl p-8 min-h-[70vh]">
                <Image
                    src={heroImage}
                    alt=""
                    className="max-w-[350px] w-[30%] hidden sm:block"
                />
                <div className="flex flex-col gap-8 text-white items-center">
                    <h1 className="font-normal text-4xl">Minerva</h1>
                    <p>Aprenda Programação Enquanto Se Diverte!</p>
                    <div className="flex flex-col gap-4">
                        <Link
                            href={"/register"}
                            className="text-black bg-[#D3B1C2] border-3 border-[#D3B1C2] rounded-3xl w-[300px] p-2.5 decoration-0 transition-[.4s] hover:scale-[1.05]"
                        >
                            Começar Agora
                        </Link>
                        <Link
                            href="/login"
                            className="text-[#D3B1C2] bg-transparent border-3 border-[#D3B1C2] rounded-3xl w-[300px] p-2.5 decoration-0 transition-[.4s] hover:scale-[1.05]"
                        >
                            Já Possuo uma Conta
                        </Link>
                    </div>
                </div>
            </section>
            <Header />
            <main className="flex flex-col md:gap-20 gap-4 items-center p-6 text-balance text-white md:text-2xl sm:text-xl text-lg">
                <section className="p-5 text-center flex justify-center max-w-[800px] items-center gap-20 md:flex-row flex-col">
                    <div className="flex flex-col gap-6 py-6">
                        <h2 className="text-[#D3B1C2] text-center text-[1.5em] font-bold">
                            Aprendizado Lúdico e Gratuito
                        </h2>
                        <p>
                            O aprendizado com Minerva usa como base metodologias
                            comprovadas cientificamente para deixar o aluno
                            motivado nos estudos.
                        </p>
                    </div>
                    <Image src={freeLearnImage} alt="" className="w-[40%]" />
                </section>
                <section className="p-5 text-center flex justify-center max-w-[800px] items-center md:gap-20 gap-2 md:flex-row flex-col-reverse">
                    <Image src={programmingImage} alt="" className="w-[40%]" />
                    <div className="flex flex-col gap-6 py-6">
                        <h2 className="text-[#D3B1C2] text-center text-[1.5em] font-bold">
                            Domine Conteúdos Básicos e Avançados
                        </h2>
                        <p>
                            Desenvolva suas habilidades de programação e lógica
                            rapidamente, dominando conteúdos básicos até mais
                            avançados.
                        </p>
                    </div>
                </section>
                <section className="flex flex-col gap-2">
                    <h2 className="text-[#D3B1C2] text-center text-[1.5em] font-bold">
                        Aprenda com Base em um Tema de Seu Interesse
                    </h2>
                    <p>
                        Você pode desenvolver suas habilidades em programação
                        concluindo desafios de temas de seus interesse.
                    </p>
                    <div className="flex gap-4">
                        <Figure
                            title="RPG de Mesa"
                            image={rpgImage}
                            isColored
                        />
                        <Figure
                            title="Detetive"
                            image={detectiveImage}
                            isColored
                        />
                        <Figure title="Terror" image={horrorImage} isColored />
                    </div>
                </section>
                <section className="flex flex-col gap-2">
                    <h2 className="text-[#D3B1C2] text-center text-[1.5em] font-bold">
                        Experiências Únicas!
                    </h2>
                    <p className="px-2">
                        Há diversos tipos de experiências que você irá passar
                        usando Minerva.
                    </p>
                    <div className="flex gap-4">
                        <Figure
                            title="Aulas Gamificadas"
                            image={gamificationImage}
                        />
                        <Figure
                            title="Ranking de Jogadores"
                            image={rankingImage}
                        />
                        <Figure title="Conquistas" image={achievementImage} />
                    </div>
                </section>
            </main>
        </>
    );
}
