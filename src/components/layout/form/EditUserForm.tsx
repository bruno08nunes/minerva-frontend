import Image from "next/image";
import Button from "./Button";
import Input from "./Input";
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import placeholderProfilePicture from "../../../../public/pc.png";

export default function EditUserForm() {
    return (
        <form className="flex flex-col gap-4">
            <div className="flex gap-4 flex-col sm:flex-row">
                <Input id="name" label="Nome:" placeholder="Nome..." />
                <Input
                    id="username"
                    label="Nome de Usuário:"
                    placeholder="@Nome de usuário..."
                />
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
                <Input
                    type="email"
                    id="email"
                    label="Email:"
                    placeholder="Email..."
                />
                <Input
                    type="password"
                    id="password"
                    label="Senha:"
                    placeholder="Senha..."
                />
            </div>
            <div className="flex gap-4 justify-center">
                <Image src={placeholderProfilePicture} alt="Sua foto de perfil atual" className="w-35" />
                <Dialog>
                    <DialogTrigger>Mudar Foto de Perfil</DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Escolha Sua Foto de Perfil</DialogTitle>
                        {/* TODO: List profile pictures */}
                    </DialogContent>
                </Dialog>
            </div>
            <Button text="Editar Usuário" />
        </form>
    );
}
