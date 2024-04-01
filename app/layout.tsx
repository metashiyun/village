import type {Metadata} from "next";
import "./globals.css";
import Navbar from "@/app/components/navbar";

const SITE_TITLE = "Shiyun Works Regions Database"
const SITE_SUBTITLE = "红石云工场区划数据库"

export const metadata: Metadata = {
    title: SITE_TITLE,
    description: `${SITE_TITLE} ${SITE_SUBTITLE}`,
    robots: {
        index: false,
        follow: false
    }
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="zh-CN">
        <body className="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col">
        <header className="flex flex-col gap-1 md:flex-row p-5 bg-white dark:bg-gray-900 dark:text-white items-center">
            <div className="md:grow text-center md:text-left">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">{SITE_TITLE}</h1>
                <h2 className="text-lg text-gray-700 dark:text-gray-100">{SITE_SUBTITLE}</h2>
            </div>
            <Navbar />
        </header>
        <div className="pb-4 flex-grow">
            {children}
        </div>
        <footer className="text-center p-5 bg-white dark:bg-gray-900 dark:text-white md:flow-root">
            <p className="md:float-left">
                游戏内容纯属虚构，不与现实世界任何人、组织、事件存在联系。
            </p>
            <p className="md:float-right">
                © 2014 - {new Date().getFullYear()} metaShiyun
            </p>
        </footer>
        </body>
        </html>
    );
}
