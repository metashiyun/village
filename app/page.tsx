import React from "react";
import {getData} from "@/app/data";
import Lookup from "@/app/components/lookup";

export default async function Home() {
    const data = await getData()

    return (
        <main>
            <Lookup data={data}/>
        </main>
    )
}
