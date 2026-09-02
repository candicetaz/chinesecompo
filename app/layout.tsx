import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "句句通｜P5 华文通顺句子练习",
  description: "每天十分钟，从句子结构到作文表达，循序渐进写出通顺自然的华文句子。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-SG"><body>{children}</body></html>;
}
