import {getData} from "@/app/utils/data";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const data = await getData()
    const regions = data.regions

    return Response.json(regions.find(r => r.id === params.id))
}