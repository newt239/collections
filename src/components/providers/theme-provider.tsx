"use client";

import type { ReactNode } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Readonly<ThemeProviderProps>) => (
  <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
    {children}
  </NextThemesProvider>
);
