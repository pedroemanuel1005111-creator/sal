import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jovens Programadores — Criação de Sites Profissionais",
  description:
    "Agência digital de uma nova geração. Sites institucionais, lojas virtuais, landing pages e sistemas web com design moderno, animações e alta performance.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
