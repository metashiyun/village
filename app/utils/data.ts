import {promises as fs} from "fs";

export const getData = async () => {
    const db = await fs.readFile(process.cwd() + '/app/regions.json', 'utf8')
    return JSON.parse(db)
}