import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Demo Website",
    template: "%s | Demo Website",
  },
  description: "Demo website project.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Demo Website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="min-h-dvh flex flex-col antialiased">{children}</body>
    </html>
  );
}
