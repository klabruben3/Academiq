import type { Metadata } from "next";
import "./index.css";

export const metadata: Metadata = {
  title: "Get started",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
