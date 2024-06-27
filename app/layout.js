import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AIMedicalTutor-EJY Health's first AI based medical diagonstics tool for Nursing Student",
  description: "Get your Analysis and information about your medical queries from our AI tool.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Toaster/>
      {children}</body>
    </html>
    </ClerkProvider>
  );
}
