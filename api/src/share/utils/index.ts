export function entitiesToHashMap(list: any[]) {
    const entitiesMap = list.reduce((acc: { [key: string]: any }, entity) => {
        acc[entity.id] = entity
        return acc
    }, {})

    return entitiesMap
}