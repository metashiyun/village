import {getData} from "@/app/data";
import LookupModel from "@/app/model/lookup";

const Model = async () => {
    const data = await getData()

    return <main>
        <LookupModel data={data} />
    </main>
}

export default Model