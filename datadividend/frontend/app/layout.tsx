import type { Metadata } from "next";
import { Inter, VT323 } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { SimulationProvider } from "@/components/SimulationProvider";

const inter = Inter({ subsets: ["latin"] });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: '--font-vt323' });

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
    <html lang="en" suppressHydrationWarning className={`${vt323.variable}`}>
      <body className={`${inter.className} antialiased bg-[#1e1e24] text-gray-200`}>
        <SimulationProvider>
          {children}
          <Toaster theme="dark" position="bottom-right" richColors closeButton />
        </SimulationProvider>
      </body>
    </html>
  );
}
