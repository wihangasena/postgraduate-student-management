import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Postgraduate Application - Wayamba University",
  description: "Apply for postgraduate programs at Wayamba University of Sri Lanka",
  keywords: ["postgraduate", "application", "Wayamba University", "Sri Lanka"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
