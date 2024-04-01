import {getData} from "@/app/data";

export async function GET() {
    const data = await getData()
    const models = data.models

    return Response.json(models)
}