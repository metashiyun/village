import {promises as fs} from 'fs'
import Lookup from "@/app/lookup";

export default async function Home() {
    const db = await fs.readFile(process.cwd() + '/app/regions.json', 'utf8')
    const data = JSON.parse(db)
    
    return (
        <main className="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col">
            <header className="text-center p-5 bg-white dark:bg-gray-900 dark:text-white">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Shiyun Works Regions Database</h1>
                <h2 className="text-lg text-gray-700 dark:text-gray-100">红石云工场区划数据库</h2>
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-200">版本：{data.version}</p>
                </div>
            </header>
            <Lookup data={data} />
            <footer className="text-center p-5 bg-white dark:bg-gray-900 dark:text-white md:flow-root">
                <p className="md:float-left">
                    游戏内容纯属虚构，不与现实世界任何人、组织、事件存在联系。
                </p>
                <p className="md:float-right">
                    © 2014 - {new Date().getFullYear()} metaShiyun
                </p>
            </footer>
        </main>
    )
}
