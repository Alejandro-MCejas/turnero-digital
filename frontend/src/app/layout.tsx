import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Turnero Digital",
  description: "Medical appointment management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={geistSans.className}>
        <QueryProvider>
          {children}
        </QueryProvider>

        <Toaster
          position="top-right"
          richColors
          closeButton
        />

      </body>
    </html>
  );
}
