import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import Stars from "@/components/Stars";
import Header from "@/components/Header";
import RecruiterToggle from "@/components/RecruiterToggle";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Nandana Pradeep",
  description: "Frontend engineer · MLOps & observability",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>
        {" "}
        <Header />
        <Stars />
        {children}
        <RecruiterToggle />
      </body>
    </html>
  );
}
