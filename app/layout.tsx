import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://academiq-nwu.vercel.app"),

  title: {
    default: "Academiq",
    template: "%s • Academiq",
  },

  description:
    "Your all-in-one student workspace. Track modules, manage assessments, plan study sessions, and stay on top of university life.",

  keywords: [
    "student planner",
    "study planner",
    "university",
    "academic dashboard",
    "module tracker",
    "assessment tracker",
    "calendar",
    "AI study assistant",
  ],

  applicationName: "Academiq",

  authors: [
    {
      name: "Ruben Caleb",
      url: "https://devfolio-rv-caleb-v3.vercel.app",
    },
  ],

  creator: "Ruben Caleb",
  publisher: "Ruben Caleb",

  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    title: "Academiq",
    description: "The modern academic workspace for students.",
    url: "https://academiq-nwu.vercel.app",
    siteName: "Academiq",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Academiq",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Academiq",
    description: "The modern academic workspace for students.",
    images: ["/og"],
  },

  category: "Education"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
