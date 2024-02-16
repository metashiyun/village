import {promises as fs} from "fs";

export async function GET() {
    const db = await fs.readFile(process.cwd() + '/app/regions.json', 'utf8')
    const data = JSON.parse(db)

    return Response.json(data)
}