import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/page-loader";
import { AlertProvider } from "@/components/alert-provider";
import { AuthProvider } from "@/lib/auth-context";
import { Analytics } from "@vercel/analytics/next";
import { LayoutClient } from "@/components/layout-client";

export const metadata: Metadata = {
  title: "Megabotics - Advanced Robotics & Automation Solutions",
  description: "Discover cutting-edge robotics, automation solutions, and innovative technology products for industries worldwide.",
  keywords: "robotics, automation, drones, industrial robots, technology",
  authors: [{ name: "Megabotics" }],
  openGraph: {
    title: "Megabotics - Advanced Robotics & Automation Solutions",
    description: "Discover cutting-edge robotics, automation solutions, and innovative technology products.",
    type: "website",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Averia+Gruesa+Libre&family=Edu+NSW+ACT+Cursive:wght@400..700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AlertProvider>
            <PageLoader />
            <LayoutClient>{children}</LayoutClient>
            <Analytics />
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
