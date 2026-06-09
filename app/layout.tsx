import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "식톡",
  description: "오늘 볼 종목과 이유를 빠르게 이해하는 투자 탐색 앱"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
