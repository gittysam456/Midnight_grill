import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { SimulationProvider } from "@/components/SimulationProvider";

const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });

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
    <html lang="en" suppressHydrationWarning className={`${spaceMono.variable}`}>
      <body className={`${spaceMono.className} antialiased bg-[#E9D7CC] text-[#F5EFE8] text-sm`}>
        <SimulationProvider>
          {children}
          <Toaster theme="dark" position="bottom-right" richColors closeButton />
        </SimulationProvider>
      </body>
    </html>
  );
}
