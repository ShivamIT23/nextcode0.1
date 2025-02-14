"use client"
import { ThemeProvider } from "next-themes";

export default function provider({children} : Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <ThemeProvider 
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
        {children}
      </ThemeProvider>
  )
}
