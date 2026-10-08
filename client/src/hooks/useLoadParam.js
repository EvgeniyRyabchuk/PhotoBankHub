// import {toInteger} from "lodash/lang";
// import {useSearchParams} from "react-router-dom";


// const useLoadParam = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
    
//     return (name, def, toInt = false) => {
//         const param = searchParams.get(name) ?? def;
//         return toInt ? toInteger(param) : param;
//     }

// }

// export default useLoadParam;

import { useSearchParams } from "react-router-dom";

const useLoadParam = () => {
    const [searchParams] = useSearchParams();
    
    return (name, def, toInt = false) => {
        const param = searchParams.get(name);
        if (param === null || param === undefined || param === '') {
            return def;
        }
        return toInt ? Number(param) : param;
    };
};

export default useLoadParam;