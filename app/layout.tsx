"use client";

import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import {
  PrimeReactProvider,
  PrimeReactContext,
  locale,
  addLocale,
} from "primereact/api";
import { useEffect } from "react";

import trLocale from "@/lib/locale/tr.json";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
addLocale("tr", trLocale);
locale("tr");
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <PrimeReactProvider>
        <body className={inter.className + "relative"}>
          <Navbar />
          <div className="p-6 pt-40 bg-gray-200 flex justify-center h-full w-full">{children}</div>     <ToastContainer />
        </body>
   
      </PrimeReactProvider>
    </html>
  );
}