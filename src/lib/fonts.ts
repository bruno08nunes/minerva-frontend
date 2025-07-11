import { Inter, VT323 } from "next/font/google";

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const codeFont = VT323({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-code",
});
