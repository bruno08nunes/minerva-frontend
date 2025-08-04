import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo-low-quality.png";

export default function LoadingHeader() {
    return (
        <header
            className={`bg-plum flex justify-between items-center p-4 top-0 z-10`}
        >
            <Link href={"/"}>
                <Image
                    src={logo}
                    alt="Logo"
                    className="md:w-[100px] sm:w-[80px] w-[65px]"
                />
            </Link>
        </header>
    );
}
