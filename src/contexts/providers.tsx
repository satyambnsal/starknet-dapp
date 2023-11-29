// app/providers.jsx

"use client";

import { StarknetProvider } from "@/contexts/StarknetProvider";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      value={{ light: "light-theme", dark: "dark-theme" }}
      defaultTheme="dark"
      enableSystem={false}
    >
      <StarknetProvider>{children}</StarknetProvider>
    </ThemeProvider>
  );
}
