'use client'

import React, {useState} from "react";

const TableRow = ({title, content}) => <div
    className={`
     px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 
     odd:bg-gray-100 dark:odd:bg-gray-800
     even:bg-white dark:even:bg-gray-900
     `}
>
    <dt className="text-sm font-medium">{title}</dt>
    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{content}</dd>
</div>

const RegionDetails = ({region, models}) => <div>
    {[
        ["中文名", region.name],
        ["拉丁名", region["name-latin"]],
        ["区号", region["region-code"]],
        ["简称", `${region["zh-abbreviation"]} / ${region.id.toUpperCase()}`],
        [
            "类别",
            models[0].regions
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
            models[0].regions.find((r) => r.id === region.type).governor.zh,
            region.governor,
        ],
        [
            `副${models[0].regions.find((r) => r.id === region.type).governor.zh}`,
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

const CityDetails = ({city, models}) => <div>
    {[
        ["中文名", city.name],
        ["拉丁名", city["name-latin"]],
        ["区号", city.id],
        [
            "类别",
            models[0].regions
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
        return <div className="mt-4 p-4 bg-white dark:bg-gray-900 max-w-4xl mx-auto sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    {region.name} {region["name-latin"]}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                    详细信息
                </p>
            </div>
            <div className="dark:text-white">
                <dl>
                    <RegionDetails region={region} models={models}/>
                </dl>
            </div>
        </div>
    }

    const LookupCity = (props: { regionId: string }) => {
        const cities = regions.find((r) => r.id === props.regionId).children;
        const firstCity = cities[0] || {id: ""}

        const [cityId, setCityId] = useState<string>(firstCity.id)

        const City = (props) => {
            const city = cities.find(c => c.id === props.cityId)
            return <div className="mt-4 p-4 bg-white dark:bg-gray-900 max-w-4xl mx-auto sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        {city.name} {city["name-latin"]}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                        详细信息
                    </p>
                </div>
                <div className="dark:text-white">
                    <dl>
                        <CityDetails city={city} models={models}/>
                    </dl>
                </div>
            </div>
        }

        return cities.length > 0 ?
            <div>
                <div className="mt-4 p-4 bg-white dark:bg-gray-900 max-w-4xl mx-auto sm:rounded-lg">
                    <h4 className="text-2xl text-center mb-2 dark:text-white">
                        查询次级区划信息
                    </h4>
                    <p className="my-2 text-center text-sm text-gray-500 dark:text-gray-300">
                        二级区划包含县（郡），三级区划包含特别区、特别市和市，四级区划包含街区、区、里和邻。
                    </p>
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
                </div>

                <City cityId={cityId}/>
            </div>
            :
            <div>
                <div className="mt-4 p-4 bg-white dark:bg-gray-900 max-w-4xl mx-auto sm:rounded-lg">
                    <h4 className="text-2xl text-center mb-2 dark:text-white">
                        细分区划信息暂缺
                    </h4>
                    <p className="my-2 text-center text-sm text-gray-500 dark:text-gray-300">
                        该区划的细分区划信息暂缺，或该区划不适用四级区划框架。
                    </p>
                </div>
            </div>
    }

    return <div className="pb-4 flex-grow">
        <div className="mt-4 p-4 bg-white dark:bg-gray-900 max-w-4xl mx-auto sm:rounded-lg">
            <h4 className="text-2xl text-center mb-2 dark:text-white">
                查询一级区划信息
            </h4>
            <p className="my-2 text-center text-sm text-gray-500 dark:text-gray-300">
                一级区划包含府、地区和玩家村落。
            </p>
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
        </div>

        <Region regionId={regionId}/>

        <LookupCity regionId={regionId}/>
    </div>
}

export default Lookup;