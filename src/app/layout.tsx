import "./globals.css";
import type { Metadata } from "next";

import { ThemeProvider } from "#/components/providers/theme-provider";

export const metadata: Metadata = {
  description: "Next.js Template",
  title: "Next.js Template",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ja" suppressHydrationWarning>
    <body>
      <ThemeProvider>{children}</ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
