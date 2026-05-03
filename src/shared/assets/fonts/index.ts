import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    { path: "./Pretendard-Thin.woff", weight: "100" },
    { path: "./Pretendard-ExtraLight.woff", weight: "200" },
    { path: "./Pretendard-Light.woff", weight: "300" },
    { path: "./Pretendard-Regular.woff", weight: "400" },
    { path: "./Pretendard-Medium.woff", weight: "500" },
    { path: "./Pretendard-SemiBold.woff", weight: "600" },
    { path: "./Pretendard-Bold.woff", weight: "700" },
    { path: "./Pretendard-ExtraBold.woff", weight: "800" },
    { path: "./Pretendard-Black.woff", weight: "900" },
  ],
  variable: "--font-pretendard",
  display: "swap",
});
