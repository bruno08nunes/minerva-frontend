"use client";

import Button from "@/components/layout/form/Button";
import Image from "next/image";

export default function CreateIconForm() {
    return (
        <form className="flex flex-col gap-4 justify-center">
            <div className="flex gap-4 items-center justify-center">
                <Image
                    src={null!}
                    width={400}
                    height={400}
                    alt="Sua foto de perfil atual"
                    className="w-35 bg-plum rounded-full"
                />
                <label className="border-2 border-lavender-blush text-lavender-blush p-3 cursor-pointer hover:scale-110 transition">
                    Adicionar Ícone
                    <input
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                </label>
            </div>
            <Button text="Criar" />
        </form>
    );
}
