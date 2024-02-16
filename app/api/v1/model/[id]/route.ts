import {promises as fs} from "fs";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const db = await fs.readFile(process.cwd() + '/app/regions.json', 'utf8')
    const data = JSON.parse(db)
    const models = data.models

    return Response.json(models.find(m => m.id === params.id))
}