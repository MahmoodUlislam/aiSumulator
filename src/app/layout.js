import { Inter } from "next/font/google";
import "./globals.scss";

// Importing the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Esikidz AI simulator",
  description: "This is a simple AI text simulator app built for Esikidz.",
  image: "/esikidz-logo.jpg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
