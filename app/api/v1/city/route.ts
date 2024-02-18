import {NextRequest} from "next/server";
import {getData} from "@/app/utils/data";

export async function GET(request: NextRequest) {
    const data = await getData()
    const regions = data.regions

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const pref = searchParams.get('pref')

    const result = regions.reduce((acc, r) => {
        const citiesWithPref = r.children.map(c => ({
            pref: r.id,
            ...c
        }));
        return acc.concat(citiesWithPref);
    }, []);

    const resultFiltered = result
        .filter(c => type ? type === c.type : true)
        .filter(c => pref ? pref === c.pref : true)

    return Response.json(resultFiltered)
}