'use client'

import InteractionCard from "@/app/components/card/interaction-card";
import React, {useState} from "react";
import InfoCard from "@/app/components/card/info-card";
import TableRow from "@/app/components/card/table-row";

const getModel = (models, id) =>
    models.find(m => m.id === id)

const LookupModel = ({data}) => {
    const {models} = data
    const firstModel = models[0] || {id: ""}
    const firstRegion = firstModel.regions[0] || {id: ""}
    const [modelId, setModelId] = useState<string>(firstModel.id)
    const [regionId, setRegionId] = useState<string>(firstRegion.id)

    const RegionDetails = ({regionId}) => {
        const region = getModel(models, modelId).regions.find((r) => r.id === regionId)

        const uniqueZhNames: string[] = Array.from(new Set(region.names.map((name) => name.zh)))
        const uniqueEnNames: string[] = Array.from(new Set(region.names.map((name) => name.en)))

        return <div>
            {[
                ["级别", region.level],
                ["类型", region.type === "public" ? "公共" : "非公共"],
                [
                    "名称（中文）",
                    uniqueZhNames.join(" / ")
                ],
                [
                    "名称（英文）",
                    uniqueEnNames.join(" / ")
                ],
                ["代表处称", region.govt ? `${region.govt.zh} ${region.govt.en}` : undefined],
                ["代表人称", region.governor ? `${region.governor.zh} ${region.governor.en}` : undefined]
            ]
                // filter out empty content.
                .filter((item) => item[1])
                .map((item, index) => (
                    <TableRow key={index} title={item[0]} content={item[1]}/>
                ))}
        </div>
    }

    return <div>
        <InteractionCard title={"查询架构"} subtitle={"请选择需要查询的架构版本。"}>
            <select
                className="form-select block w-full mb-1 rounded-md p-2 border dark:bg-gray-800 dark:text-white dark:border-0"
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
            >
                {models.map((m) => (
                    <option value={m.id} key={m.id}>
                        {m.name}
                    </option>
                ))}
            </select>
        </InteractionCard>

        <InteractionCard title={"查询区划"} subtitle={"请选择需要查询的区划类型。"}>
            <select
                className="form-select block w-full mb-1 rounded-md p-2 border dark:bg-gray-800 dark:text-white dark:border-0"
                value={regionId}
                onChange={(e) => setRegionId(e.target.value)}
            >
                {getModel(models, modelId).regions.map((r) => {
                    const uniqueNames: string[] = Array.from(new Set(r.names.map((name) => name.zh)))

                    return <option value={r.id} key={r.id}>
                        第 {r.level} 级区划：{uniqueNames.join(" / ")}
                    </option>
                })}
            </select>
        </InteractionCard>

        <InfoCard title={getModel(models, modelId).name} subtitle={"详细信息"}>
            <RegionDetails regionId={regionId} />
        </InfoCard>
    </div>

}

export default LookupModel