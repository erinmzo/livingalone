import KakaoScript from "@/utils/KakaoScript";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

declare global {
  interface Window {
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: {
    default: "혼자살때",
    template: `%s | 혼자살때`,
  },
  description:
    "설레이는 첫 자취를 시작한 자취생의 걱정을 덜어주는 커뮤니티 웹서비스",
  openGraph: {
    title: "혼자살때",
    description:
      "설레이는 첫 자취를 시작한 자취생의 걱정을 덜어주는 커뮤니티 웹서비스",
    siteName: "혼자살때",
    locale: "ko_KR",
    type: "website",
    url: "https://livingalone.vercel.app/",
    images: {
      url: "/img/meta-image.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body>{children}</body>
      <KakaoScript />
    </html>
  );
}
