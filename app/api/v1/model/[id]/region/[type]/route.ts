import {promises as fs} from "fs";

export async function GET(
    request: Request,
    { params }: { params: { type: string, id: string } }
) {
    const db = await fs.readFile(process.cwd() + '/app/regions.json', 'utf8')
    const data = JSON.parse(db)
    const model = data.models.find(m => m.id === params.id)
    const regions = model.regions

    // type is "id" in data
    return Response.json(regions.find(r => r.id === params.type))
}