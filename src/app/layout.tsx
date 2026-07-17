import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MainNav } from "@/shared/components/main-nav";
import "@/shared/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mis tareas y notas",
  description: "Gestiona tus tareas y notas diarias en el navegador",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <MainNav />
        {children}
      </body>
    </html>
  );
}
