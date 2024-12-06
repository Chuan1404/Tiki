export function entitiesToHashMap(list: any[]) {
    const entitiesMap = list.reduce((acc: { [key: string]: any }, entity) => {
        acc[entity.id] = entity
        return acc
    }, {})

    return entitiesMap
}

export const convertQuery = (rawQuery: { [key: string]: any }) => {
    const convertedQuery = Object.keys(rawQuery).reduce(
      (acc: { [string: string]: any }, key) => {
        // array
        if (Array.isArray(rawQuery[key])) {
          if (rawQuery[key].length > 0)
            acc[key] = {
              in: rawQuery[key],
            };
        }
        // others
        else {
          acc[key] = rawQuery[key];
        }
        return acc;
      },
      {}
    );
    return convertedQuery;
  };