import H1 from "@/components/layout/H1";
import Link from "next/link";

const adminPages = [
    {
        text: "Temas",
        link: "themes",
    },
    {
        text: "Tópicos",
        link: "topics",
    },
    {
        text: "Lições",
        link: "lessons",
    },
    {
        text: "Ícones",
        link: "icons",
    },
    {
        text: "Fotos de Perfil",
        link: "profilePictures",
    },
    {
        text: "Conquistas",
        link: "achievements",
    },
    {
        text: "Explicações",
        link: "explanations",
    },
];

export default async function AdminPage() {
    return (
        <>
            <H1 title="Administrador" />
            <section className="grid grid-cols-2 gap-4 text-center">
                {adminPages.map((item) => (
                    <Link
                        key={item.text}
                        href={"/admin/" + item.link}
                        className="bg-plum text-lavender-blush p-3 hover:scale-105 cursor-pointer text-2xl transition rounded-md"
                    >
                        {item.text}
                    </Link>
                ))}
            </section>
        </>
    );
}
