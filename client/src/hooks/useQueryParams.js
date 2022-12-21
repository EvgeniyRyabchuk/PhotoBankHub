import {useMemo} from "react";

 const useQueryParams = (params) => {
    return {
        queryParamString: useMemo(() => {
             let keyValue = [];
             for (let param of params) {
                 if(param.value)
                    keyValue.push(param.key + "=" + param.value);
             }
             const str = keyValue.join('&');
             return str ? `?${str}` : '';
     }, params)
    };
}

export default useQueryParams;