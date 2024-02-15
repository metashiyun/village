"use client";

import { useState } from "react";
import { RegionDetails, CityDetails } from "./components/regionDetail";

const Lookup = ({ data }) => {
  const [prefId, setPrefId] = useState("dj");
  const { regions, models } = data;
  const Prefecture = ({ prefId }) => {
    const region = regions.find((r) => r.id === prefId);
    return (
      <div className="mt-4 p-4 bg-white dark:bg-gray-900 max-w-4xl mx-auto sm:rounded-lg">
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
            <RegionDetails region={region} models={models} />
          </dl>
        </div>
      </div>
    );
  };

  const LookupCity = ({ prefId }) => {
    const prefecture = data.regions.find((r) => r.id === prefId);
    const cities = prefecture.children;

    const [cityId, setCityId] = useState(cities[0].id);

    return (
      <>
        <div className="mt-4 p-4 bg-white dark:bg-gray-900 max-w-4xl mx-auto sm:rounded-lg">
          <h4 className="text-2xl text-center mb-2 dark:text-white">
            查询三级区划信息
          </h4>
          <p className="my-2 text-center text-sm text-gray-500 dark:text-gray-300">
            注：二级及以下区划信息尚不完善。
          </p>
          <select
            className="form-select block w-full mb-1 rounded-md p-2 border dark:bg-gray-800 dark:text-white dark:border-0"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
          >
            {cities.map((c) => (
              <option value={c.id} key={c.id}>
                {c.id} {c.name}
              </option>
            ))}
          </select>
        </div>

        <City city={cities.find((c) => c.id === cityId)} />
      </>
    );
  };

  const City = ({ city }) => {
    return (
      <div className="mt-4 p-4 bg-white dark:bg-gray-900 max-w-4xl mx-auto sm:rounded-lg">
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
            {/* <div className="bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium">中文名</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                {city.name}
              </dd>
            </div>
            <div className="bg-white dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium">拉丁名</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                {city["name-latin"]}
              </dd>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium">区号</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{city.id}</dd>
            </div>
            <div className="bg-white dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium">类别</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                {data.models[0].regions.find((r) => r.id === city.type).names
                  .length > 1
                  ? data.models[0].regions
                      .find((r) => r.id === city.type)
                      .names.reduce(
                        (a, b) =>
                          a.zh +
                          " (" +
                          a.en +
                          ")" +
                          " / " +
                          b.zh +
                          " (" +
                          b.en +
                          ")"
                      )
                  : data.models[0].regions.find((r) => r.id === city.type)
                      .names[0].zh +
                    " (" +
                    data.models[0].regions.find((r) => r.id === city.type)
                      .names[0].en +
                    ")"}
              </dd>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium">所属二级区划</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                {city.county}
              </dd>
            </div>
            <div className="bg-white dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium">包含四级区划</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                {city.neighborhoods}
              </dd>
            </div> */}
            <CityDetails city={city} models={data.models} />
          </dl>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-4 flex-grow">
      <div className="mt-4 p-4 bg-white dark:bg-gray-900 max-w-4xl mx-auto sm:rounded-lg">
        <h4 className="text-2xl text-center mb-2 dark:text-white">
          查询一级区划信息
        </h4>
        <p className="my-2 text-center text-sm text-gray-500 dark:text-gray-300">
          一级区划包括府、地区和玩家村落。
        </p>
        <select
          className="form-select block w-full mb-1 rounded-md p-2 border dark:bg-gray-800 dark:text-white dark:border-0"
          value={prefId}
          onChange={(e) => setPrefId(e.target.value)}
        >
          {data.regions.map((r) => (
            <option value={r.id} key={r.id}>
              {r["region-code"]} {r.name}
            </option>
          ))}
        </select>
      </div>

      <Prefecture prefId={prefId} />

      <LookupCity prefId={prefId} />
    </div>
  );
};

export default Lookup;
