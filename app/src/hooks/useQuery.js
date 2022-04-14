import { useEffect, useState } from "react";

const useQuery = (promise, dependencyList = []) => {
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        (async () => {
            setFetching(true);
            const res = await promise();
            setFetching(false);
            setData(res)
        })()
    }, dependencyList)

    return {
        data,
        fetching
    }
}

export default useQuery;