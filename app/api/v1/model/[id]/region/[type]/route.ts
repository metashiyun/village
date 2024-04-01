import {getData} from "@/app/data";

export async function GET(
    request: Request,
    { params }: { params: { type: string, id: string } }
) {
    const data = await getData()
    const model = data.models.find(m => m.id === params.id)
    const regions = model.regions

    // type is "id" in data
    return Response.json(regions.find(r => r.id === params.type))
}