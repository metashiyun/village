import {NextRequest} from "next/server";
import {getData} from "@/app/data";

export async function GET(request: NextRequest) {
    const data = await getData()
    const regions = data.regions

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    const regionsFiltered = regions
        .filter(r => type ? type === r.type : true)

    return Response.json(regionsFiltered)
}