import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import ConvexProvider from "./convexProvider";
import Navbar from "@nextCode/components/custom/c_Navbar";

export const metadata: Metadata = {
  title: "NextCode0.1",
  description: "created by Shivam Gupta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexProvider>
          <Provider>
            <Navbar />
            {children}
          </Provider>
        </ConvexProvider>
      </body>
    </html>
  );
}
