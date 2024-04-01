import {getData} from "@/app/data";

export async function GET() {
    const data = await getData()

    return Response.json(data)
}