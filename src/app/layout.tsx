import type { Metadata } from "next";
import { Sora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";
import { Layout } from "@/components/Providers/Layout";

const nexa = localFont({
  src: "../../public/fonts/nexa_heavy.ttf",
  variable: "--font-nexa",
});

const sora = Sora({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Hypnos",
  description: "Hypnos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${nexa.variable}`}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
