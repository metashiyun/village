import {promises as fs} from "fs";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const db = await fs.readFile(process.cwd() + '/app/regions.json', 'utf8')
    const data = JSON.parse(db)
    const regions = data.regions

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    const regionsFiltered = regions
        .filter(r => type ? type === r.type : true)

    return Response.json(regionsFiltered)
}