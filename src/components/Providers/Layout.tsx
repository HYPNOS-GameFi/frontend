"use client";
import { PropsWithChildren } from "react";
import { Header } from "../Header";
import useGetAddress from "@/hooks/useGetAddress";
import { Footer } from "../Footer";
import { Toaster } from "react-hot-toast";

export function Layout({ children }: PropsWithChildren) {
  useGetAddress();
  return (
    <div className="min-h-screen bg-[#111111]">
      <Header />
      <Toaster toastOptions={{ duration: 5000 }} />
      {children}
      <Footer />
    </div>
  );
}
