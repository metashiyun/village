import {promises as fs} from "fs";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const db = await fs.readFile(process.cwd() + '/app/regions.json', 'utf8')
    const data = JSON.parse(db)
    const regions = data.regions

    return Response.json(regions.find(r => r.id === params.id))
}