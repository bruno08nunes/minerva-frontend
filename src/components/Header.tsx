import Image from "next/image";
import logo from "../../public/minerva.png";
import Link from "next/link";
import { Settings, CircleUser, Menu, Bell } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-[#613659] flex justify-between items-center p-4 sticky top-0">
            <Link href={"/"}>
                <Image src={logo} alt="Logo" className="w-[80px]" />
            </Link>
            <nav className="flex text-2xl gap-4">
                <Link
                    href={"/"}
                    className="text-[#D3B1C2] decoration-0 hover:decoration-1"
                >
                    Desafios
                </Link>
                <Link
                    href={"/"}
                    className="text-[#D3B1C2] decoration-0 hover:decoration-1"
                >
                    Explicações
                </Link>
                <Link
                    href={"/"}
                    className="text-[#D3B1C2] decoration-0 hover:decoration-1"
                >
                    Ranking
                </Link>
            </nav>
            <div className="flex gap-4">
                <button
                    className="bg-transparent border-0 cursor-pointer"
                    aria-label="Notificações"
                >
                    <Bell color="#D3B1C2" size={40} /> 
                </button>
                <Link href={"/"}>
                    <CircleUser color="#D3B1C2" size={40} />
                </Link>
                <button
                    className="bg-transparent border-0 cursor-pointer"
                    aria-label="Configurações"
                >
                    <Settings color="#D3B1C2" size={40} />
                </button>
                <button
                    className="bg-transparent border-0 cursor-pointer hidden"
                    aria-label="Abrir menu"
                >
                    <Menu color="#D3B1C2" size={40} />
                </button>
            </div>
            <nav className="hidden absolute top-[100%] right-0 flex-col bg-[#613659] p-2.5 gap-2 text-xl shadow">
                <Link href={"/"} className="text-[#D3B1C2] decoration-0">Desafios</Link>
                <Link href={"/"} className="text-[#D3B1C2] decoration-0">Explicações</Link>
                <Link href={"/"} className="text-[#D3B1C2] decoration-0">Ranking</Link>
                <Link href={"/"} className="text-[#D3B1C2] decoration-0">Notificações</Link>
                <Link href={"/"} className="text-[#D3B1C2] decoration-0">Perfil</Link>
                <Link href={"/"} className="text-[#D3B1C2] decoration-0">Configurações</Link>
            </nav>
        </header>
    )
}