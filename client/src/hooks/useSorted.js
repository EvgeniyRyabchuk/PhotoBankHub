import {useMemo} from "react";


export function useSortedList(target, sort)
{
    const sortedPosts = useMemo(() =>
    {
        if(sort)
        {
            return [...target].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return target;
    }, [sort, target]);
    return sortedPosts;
}
