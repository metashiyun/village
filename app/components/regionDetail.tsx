import React from "react";

const TableRow = ({ title, content }) => (
  <div
    className={`
     px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 
     odd:bg-gray-100 dark:odd:bg-gray-800
     even:bg-white dark:even:bg-gray-900
     `}
  >
    <dt className="text-sm font-medium">{title}</dt>
    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{content}</dd>
  </div>
);

export const RegionDetails = ({ region, models }) => (
  <div>
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
      ["首府", region.capital],
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
        <TableRow key={index} title={item[0]} content={item[1]} />
      ))}
  </div>
);

export const CityDetails = ({ city, models }) => (
  <div>
    {[
      ["中文名", city.name],
      ["拉丁名", city["name-latin"]],
      ["区号", city["id"]],
      [
        "类别",
        models[0].regions
          .find((r) => r.id === city.type)
          .names.map((name) => `${name.zh} (${name.en})`)
          .join(" / "),
      ],
      ["所属二级区划", city.county],
      ["包含四级区划", city.neighborhoods],
    ]
      // filter out empty content. if needed, uncomment the line below
      // .filter((item) => item[1])
      .map((item, index) => (
        <TableRow key={index} title={item[0]} content={item[1]} />
      ))}
  </div>
);
