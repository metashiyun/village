import {getData} from "@/app/utils/data";

export async function GET() {
    const data = await getData()

    return Response.json(data)
}