import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.scss";
import Loading from "./components/loading";

// Importing the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Esikidz AI simulator",
  description: "This is a simple AI text simulator app built for Esikidz.",
  image: "/esikidz-logo.svg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense fallback={<Loading />}>
        <body className={inter.className}>{children}</body>
      </Suspense>
    </html>
  );
}
