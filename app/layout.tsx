import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "서류도우미 - 외국인 행정서류 작성 도우미",
  description: "E-9 비자 체류기간 연장부터 필요한 서류 안내까지. 외국인 행정서류 준비를 쉽게 도와드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}