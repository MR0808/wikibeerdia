import {
    Inter,
    Averia_Serif_Libre,
    Kaushan_Script,
    Shrikhand,
    Questrial,
    Assistant
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const assistant = Assistant({ subsets: ["latin"] });


export const averia = Averia_Serif_Libre({
    weight: "700",
    subsets: ["latin"],
    display: "swap"
});

export const kaushan = Kaushan_Script({
    weight: "400",
    subsets: ["latin"],
    display: "swap"
});

export const shrikhand = Shrikhand({
    weight: "400",
    subsets: ["latin"],
    display: "swap"
});

export const questrial = Questrial({
    weight: "400",
    subsets: ["latin"],
    display: "swap"
});
