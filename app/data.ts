export const getData = async () => {
    const res = await fetch('https://static.shiyun.org/regions/regions.json', { cache: 'no-store' })
    return await res.json()
}