export function getUniqueList(
    list: string[]
): string[]
export function getUniqueList<Data>(
    list: Data[],
    getKey: (data: Data) => string | number
): Data[]
export function getUniqueList<Data>(
    list: Data[],
    getKey?: (data: Data) => string | number
): Data[] {
    const storage: Record<string | number, Data> = {}
    list.forEach((data) => {
        const key = getKey ? getKey(data) : data as string | number
        storage[key] = data
    })
    const values = Object.values(storage)
    return values
}