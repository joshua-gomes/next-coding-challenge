import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootProviders from "@/components/RootProviders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/**
 * Since on most e-commerce sites the basket context is needed to help manage your basket state
 * in your header component, I think this will be required as part of the layout component
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className}`}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
