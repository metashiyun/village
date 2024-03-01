import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shiyun Works Regions Database",
  description: "Shiyun Works Regions Database 红石云工场区划数据库",
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
