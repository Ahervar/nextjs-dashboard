import type { Metadata } from "next";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import AuthSync from "@/components/AuthSync";
import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assessment App",
  description: "Next.js Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProviderWrapper>
          <ThemeRegistry>
            <AuthSync />
            {children}
          </ThemeRegistry>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}