import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${GeistMono.variable} ${GeistSans.variable}`}>
        <ThemeProvider attribute="class">
          <Header />
          <main className="flex max-w-2xl mx-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
