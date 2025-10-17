import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Selloframe - AI 기반 상품 이미지 생성 플랫폼",
  description: "AI 기술로 몇 초 만에 전문가 수준의 상품 이미지를 생성하세요. 배경 제거부터 합성까지 자동으로 처리합니다.",
  keywords: ["AI", "상품 이미지", "이미지 생성", "전자상거래", "Selloframe"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} antialiased bg-[#08090a] text-[#f7f8f8]`}>
        <QueryProvider>
          {children}
          <Toaster
            position="top-center"
            richColors
            theme="dark"
            toastOptions={{
              style: {
                background: '#141516',
                border: '1px solid #23252a',
                color: '#f7f8f8',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
