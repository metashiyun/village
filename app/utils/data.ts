export const getData = async () => {
    const res = await fetch('https://static.shiyun.org/regions/regions.json')
    return await res.json()
}