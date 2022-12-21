import {useEffect, useRef} from "react";


export const useObserver = (ref, canLoad, isLoading, callback) => {

    const observer = useRef();

    useEffect(() =>
    {
        if(!ref) return;
        if(isLoading) return;
        if(observer.current) observer.current.disconnect(); 
        var cb = function(entries, observer) {
            if(entries[0].isIntersecting && canLoad) { 
                console.log("ДИВ В ЗОНЕ ВИДИМОСТИ");
                callback();
            }
        };
        
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
        console.log('build');
    }, [isLoading])
}