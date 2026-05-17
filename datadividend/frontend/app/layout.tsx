import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { SimulationProvider } from "@/components/SimulationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DataDividend | Zero-Knowledge Data Marketplace",
  description: "Monetize your data anonymously with Midnight Network ZK proofs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-[#0a0a0f] text-gray-100`}>
        <SimulationProvider>
          {children}
          <Toaster theme="dark" position="bottom-right" richColors closeButton />
        </SimulationProvider>
      </body>
    </html>
  );
}
