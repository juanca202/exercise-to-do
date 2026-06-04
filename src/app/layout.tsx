import type { Metadata } from "next";
import { Lexend } from "next/font/google";

import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To-Dos",
  description: "Aplicación de gestión de tareas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${lexend.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-lexend)]">
        <div className="root flex min-h-full flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
