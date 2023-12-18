import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import "./globals.css";
import Navbar from "./navbar";
import AppContextProvider from "./contexts/AppContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wonderland",
  description: "The best place to learn about crypto and DeFi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>
          <main className="flex min-h-screen flex-col p-12 pt-16">
            {children}
          </main>
        </AppContextProvider>
      </body>
    </html>
  );
}
