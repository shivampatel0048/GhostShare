import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GhostShare - Secure & Anonymous File & Link Sharing with QR Codes",
  description: "GhostShare allows you to securely share files and links anonymously without the need for login. Upload documents, images, PDFs, and more, then generate a short URL and QR code for instant access. Track visits to your links and enjoy enhanced privacy with password-protected or self-destructing links. Perfect for sharing files across devices or quickly sending links without revealing any personal information.",
  icons: [
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/icon.png" },
    { rel: "icon", type: "image/svg+xml", sizes: "any", url: "/icon.svg" },
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon.ico" },
    { rel: "icon", type: "image/png", sizes: "96x96", url: "/icon.png" },
    { rel: "apple-touch-icon", type: "image/png", sizes: "180x180", url: "/apple-icon.png" },
    { rel: "shortcut icon", type: "image/x-icon", url: "/favicon.ico" }
  ],
  manifest: "/manifest.json",
  applicationName: "GhostShare",
  appleWebApp: {
    capable: true,
    title: "GhostShare",
    startupImage: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="apple-mobile-web-app-title" content="GhostShare" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth box-border m-0 p-0`}
      >
        {children}
      </body>
    </html>
  );
}
