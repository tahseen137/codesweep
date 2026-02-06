import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeSweep - Find AI Debt in Your Codebase",
  description: "Scan codebases for AI-generated code smells, dead code, and quality issues. Get instant A-F grade with actionable recommendations.",
  keywords: "code quality, AI code debt, static analysis, code scanner, tech debt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
