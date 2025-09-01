import H1 from "@/components/layout/H1";
import Button from "@/components/layout/form/Button";
import { listThemes } from "@/lib/api/themes";
import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";

export default async function AdminThemesPage() {
    const { message, themesData: themes, success } = await listThemes();

    const resetThemeCache = async () => {
        "use server";

        revalidateTag("themes");
    };

    return (
        <>
            <H1 title="Editar Temas" />
            <section className="flex flex-col gap-3">
                <Link
                    href={"/admin/themes/form/create"}
                    className="w-full bg-plum text-lavender-blush p-4 rounded-md text-center text-xl"
                >
                    Criar Tema
                </Link>
                <button
                    className="w-full bg-plum text-lavender-blush p-4 rounded-md text-center text-xl cursor-pointer"
                    onClick={resetThemeCache}
                >
                    Resetar Cache
                </button>
                {success ? (
                    themes?.map((theme) => (
                        <Link
                            href={"/admin/themes/form/" + theme.slug}
                            key={theme.id}
                            className="w-full bg-plum text-lavender-blush p-2 rounded-md flex gap-2 items-center text-xl"
                        >
                            <Image
                                src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${theme.icon.url}`}
                                alt=""
                                className="max-w-[100px]"
                                width={400}
                                height={400}
                            />
                            <div>
                                <div className="flex gap-2 items-baseline">
                                    <span className="font-bold text-2xl">
                                        {theme.name}
                                    </span>
                                    <span className="italic">{theme.slug}</span>
                                </div>
                                <p>{theme.description}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>{message}</p>
                )}
            </section>
        </>
    );
}
