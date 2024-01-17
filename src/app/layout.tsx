import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { App } from "@/app/_app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Land Tools",
  description: "Tools for comping land",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
