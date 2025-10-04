import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { Settings, CircleUser, Menu, Bell } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

const links = [
    {
        path: "/learn/themes",
        text: "Desafios",
    },
    {
        path: "/explanations",
        text: "Explicações",
    },
    {
        path: "/ranking",
        text: "Ranking",
    },
    {
        path: "/",
        text: "Notificações",
    },
    {
        path: "/",
        text: "Perfil",
    },
    {
        path: "/user/edit",
        text: "Configurações",
    },
];

export default async function Header({
    isSticky = true,
}: {
    isSticky?: boolean;
}) {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    let userLink = "/login";
    
    if (token) {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/me`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const data = await res.json();
        userLink = data.user ? `/users/${data.user.username}` : "/login";
    }

    return (
        <header
            className={`bg-plum flex justify-between items-center p-4 ${
                isSticky ? "sticky" : ""
            } top-0 z-10`}
        >
            <Link href={"/"}>
                <Image
                    src={logo}
                    alt="Logo"
                    className="md:w-[100px] sm:w-[80px] w-[65px]"
                />
            </Link>
            <nav className="flex text-2xl gap-4">
                <Link
                    href={"/learn/themes"}
                    className="text-lavender-blush decoration-0 hover:decoration-1 hidden sm:block"
                >
                    Desafios
                </Link>
                <Link
                    href={"/explanations"}
                    className="text-lavender-blush decoration-0 hover:decoration-1 hidden sm:block"
                >
                    Explicações
                </Link>
                <Link
                    href={"/ranking"}
                    className="text-lavender-blush decoration-0 hover:decoration-1 hidden sm:block"
                >
                    Ranking
                </Link>
            </nav>
            <div className="flex gap-4">
                <button
                    className="bg-transparent border-0 cursor-pointer hidden sm:block"
                    aria-label="Notificações"
                >
                    <Bell color="#D3B1C2" size={35} />
                </button>
                <Link href={userLink} className="hidden sm:block">
                    <CircleUser color="#D3B1C2" size={35} />
                </Link>
                <Link
                    href={"/user/edit"}
                    className="bg-transparent border-0 cursor-pointer hidden sm:block"
                >
                    <Settings color="#D3B1C2" size={35} />
                </Link>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="cursor-pointer sm:hidden">
                        <Menu color="#D3B1C2" size={40} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="bg-plum p-2.5 gap-2 text-xl shadow"
                        side="top"
                        align="end"
                        sideOffset={30}
                    >
                        {links.map((item, index) => (
                            <DropdownMenuItem
                                className="text-lg"
                                key={index}
                                asChild
                            >
                                <Link
                                    href={item.text === "Perfil" ? userLink : item.path}
                                    className="text-lavender-blush decoration-0"
                                >
                                    {item.text}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
