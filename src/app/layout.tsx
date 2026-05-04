import type { Metadata } from "next";
import { pretendard } from "@/shared/assets/fonts";
import "./globals.css";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";
import QueryProvider from "@/shared/providers/QueryProvider";

export const metadata: Metadata = {
  title: "PCF 배출량 분석 대시보드",
  description: "제품 탄소 발자국(PCF) 전과정 데이터를 시각화하는 탄소 배출량 관리 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`}>
      <body className="font-pretendard bg-background text-text flex items-start">
        <QueryProvider>
          <Sidebar />
          <div className="flex-1 min-h-screen">
            <main className="w-full max-w-7xl mx-auto pb-16 md:pb-0 md:pl-18">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
