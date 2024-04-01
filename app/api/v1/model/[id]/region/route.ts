import {getData} from "@/app/data";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const data = await getData()
    const model = data.models.find(m => m.id === params.id)
    const regions = model.regions

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const level = searchParams.get('level')

    const regionsFiltered = regions
        .filter(r => type ? type === r.type : true)
        .filter(r => level ? level === "" + r.level : true)

    return Response.json(regionsFiltered)
}