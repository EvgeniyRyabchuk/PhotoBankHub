export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
}

export const getPagesArray = (totalPages) =>
{
    console.log('asdgvasfdasdf');
    let result = [];
    for(let i = 0; i < totalPages; i++)
    {
        result.push(i + 1)
    }
    return result;
}

export const getQueryVarsInStringFormat = (params) => {
    let keyValue = [];
    for (let param of params) {
        if(param.value)
            keyValue.push(param.key + "=" + param.value);
    }
    const str = keyValue.join('&');
    return str ? `?${str}` : '';
}

export const searchPramsToString = (searchParams) => {
    let string = '';
    for(let entry of searchParams.entries()) {
        const entryString = `${entry[0]}=${entry[1]}`;
        if(string.length === 0) string = entryString;
        else string += `&${entryString}`
    }
    return string.length === 0 ? string : `?${string}`;
}