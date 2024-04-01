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
    const Logo = () => <svg className="text-black dark:text-white" width="60" height="48" viewBox="0 0 256 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 80L60.9524 41.9048L121.905 80L60.9524 118.095L0 80Z" fill="currentColor"/>
        <path d="M67.0476 38.0952L128 0L188.952 38.0952L128 76.1905L67.0476 38.0952Z" fill="currentColor"/>
        <path d="M67.0476 121.905L128 83.8095L188.952 121.905L128 160L67.0476 121.905Z" fill="currentColor"/>
        <path d="M134.095 80L195.048 41.9048L256 80L195.048 118.095L134.095 80Z" fill="currentColor"/>
    </svg>

    return (
        <html lang="zh-CN">
        <body className="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col">
        <header className="flex flex-col gap-1 md:flex-row p-5 bg-white dark:bg-gray-900 dark:text-white items-center">
            <div className="md:grow text-center md:text-left">
                <div className="flex md:flex-row flex-col md:gap-4 gap-1 items-center">
                    <div>
                        <Logo />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">{SITE_TITLE}</h1>
                        <h2 className="text-lg text-gray-700 dark:text-gray-100">{SITE_SUBTITLE}</h2>
                    </div>
                </div>
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
