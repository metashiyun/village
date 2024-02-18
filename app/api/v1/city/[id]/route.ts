import {getData} from "@/app/utils/data";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const data = await getData()
    const regions = data.regions

    const result = regions.reduce((acc, r) => {
        const citiesWithPref = r.children.map(c => ({
            pref: r.id,
            ...c
        }));
        return acc.concat(citiesWithPref);
    }, []);

    return Response.json(result.find(c => c.id === params.id))
}