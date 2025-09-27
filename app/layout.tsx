import type { Metadata } from "next";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "X Profile Viral Intelligence",
  description: "Decode what makes X profiles and content go viral with AI-powered analytics",
  keywords: ["X analytics", "Twitter analytics", "viral content", "social media analysis", "content strategy"],
  authors: [{ name: "X Profile Analyzer" }],
  openGraph: {
    title: "X Profile Viral Intelligence",
    description: "Decode what makes X profiles and content go viral",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="font-jetbrains antialiased"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}