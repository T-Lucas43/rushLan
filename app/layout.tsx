import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Rush Lan House | Seu destino para jogar", template: "%s | Rush Lan House" },
  description: "PC Gamer, PS5, corujões e a melhor experiência gamer. Faça sua reserva na Rush Lan House.",
  openGraph: {
    title: "Rush Lan House",
    description: "O seu destino definitivo para jogos e diversão.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
