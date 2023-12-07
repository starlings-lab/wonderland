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
          <Suspense>
            <Navbar />
          </Suspense>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
