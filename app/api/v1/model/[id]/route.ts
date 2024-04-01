import {getData} from "@/app/data";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const data = await getData()
    const models = data.models

    return Response.json(models.find(m => m.id === params.id))
}