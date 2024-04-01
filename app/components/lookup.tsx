'use client'

import React, {useState} from "react";
import InfoCard from "@/app/components/card/info-card";
import InteractionCard from "@/app/components/card/interaction-card";
import TableRow from "@/app/components/card/table-row";

const getModel = (models, id) =>
    models.find(m => m.id === id)

const RegionDetails = ({region, models}) => <div>
    {[
        ["中文名", region.name],
        ["拉丁名", region["name-latin"]],
        ["区号", region["region-code"]],
        ["简称", `${region["zh-abbreviation"]} / ${region.id.toUpperCase()}`],
        [
            "类别",
            getModel(models, region.model).regions
                .find((r) => r.id === region.type)
                .names.map(
                (name: { zh: string; en: string }) => `${name.zh} (${name.en})`
            )
                .join(" / "),
        ],
        [
            `${region.name}${models[0].regions.find(r => r.id === region.type).govt.zh}驻`,
            region.capital
        ],
        ["建立年份", region.est],
        ["传送点域名", `${region.id}.`],
        [
            getModel(models, region.model).regions.find((r) => r.id === region.type).governor.zh,
            region.governor,
        ],
        [
            `副${getModel(models, region.model).regions.find((r) => r.id === region.type).governor.zh}`,
            region["vice-governor"],
        ],
        ["信息更新于", new Date(region["last-updated"]).toLocaleDateString()],
    ]
        // filter out empty content
        .filter((item) => item[1])
        .map((item, index) => (
            <TableRow key={index} title={item[0]} content={item[1]}/>
        ))}
</div>

const CityDetails = ({city, model}) => <div>
    {[
        ["中文名", city.name],
        ["拉丁名", city["name-latin"]],
        ["区号", city.id],
        [
            "类别",
            model.regions
                .find((r) => r.id === city.type)
                .names.map((name) => `${name.zh} (${name.en})`)
                .join(" / "),
        ],
        ["马匹编号前缀", city.license],
        ["所属二级区划", city.county],
        ["包含四级区划", city.neighborhoods],
    ]
        // filter out empty content.
        .filter((item) => item[1])
        .map((item, index) => (
            <TableRow key={index} title={item[0]} content={item[1]}/>
        ))}
</div>

const Lookup = ({data}) => {
    const {regions, models} = data

    const [regionId, setRegionId] = useState<string>(regions[0].id)

    const Region = (props: { regionId: string }) => {
        const region = regions.find((r) => r.id === props.regionId)
        return <InfoCard title={`${region.name} ${region["name-latin"]}`} subtitle={"详细信息"}>
            <dl>
                <RegionDetails region={region} models={models}/>
            </dl>
        </InfoCard>
    }

    const LookupCity = (props: { regionId: string }) => {
        const region = regions.find((r) => r.id === props.regionId)
        const cities = region.children;
        const firstCity = cities[0] || {id: ""}

        const [cityId, setCityId] = useState<string>(firstCity.id)

        const City = (props) => {
            const city = cities.find(c => c.id === props.cityId)
            return <InfoCard title={`${city.name} ${city["name-latin"]}`} subtitle={"详细信息"}>
                <dl>
                    <CityDetails city={city} model={getModel(models, region.model)}/>
                </dl>
            </InfoCard>
        }

        return cities.length > 0 ?
            <div>
                <InteractionCard title={"查询次级区划信息"}
                                 subtitle={"二级区划包含县（郡），三级区划包含特别区、特别市和市，四级区划包含街区、区、里和邻。"}>
                    <select
                        className="form-select block w-full mb-1 rounded-md p-2 border dark:bg-gray-800 dark:text-white dark:border-0"
                        value={cityId}
                        onChange={(e) => setCityId(e.target.value)}
                    >
                        {cities.map((c: { id: string, name: string }) => (
                            <option value={c.id} key={c.id}>
                                {c.id} {c.name}
                            </option>
                        ))}
                    </select>
                </InteractionCard>

                <City cityId={cityId}/>
            </div>
            :
            <div>
                <InteractionCard title={"细分区划信息暂缺"}
                                 subtitle={"该区划的细分区划信息暂缺，或该区划不适用四级区划框架。"}/>
            </div>
    }

    return <div>
        <InteractionCard title={"查询一级区划信息"} subtitle={"一级区划包含府、地区和玩家村落。"}>
            <select
                className="form-select block w-full mb-1 rounded-md p-2 border dark:bg-gray-800 dark:text-white dark:border-0"
                value={regionId}
                onChange={(e) => setRegionId(e.target.value)}
            >
                {data.regions.map((r) => (
                    <option value={r.id} key={r.id}>
                        {r["region-code"]} {r.name}
                    </option>
                ))}
            </select>
        </InteractionCard>

        <Region regionId={regionId}/>
        <LookupCity regionId={regionId}/>
    </div>
}

export default Lookup;