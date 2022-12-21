import {Dispatch, useEffect, useRef, useState} from "react";

interface TimerReturnData {
    timer: any | null,
    start: () => void,
    stop: () => void
}

const useTimeoutLoop = (callback: () => void, intervalMS: number) : TimerReturnData => {
    const timer = useRef<any | null>(null);

    const loop = () => {
        const timer_id = setTimeout(() => {
            callback();
            loop();
        }, intervalMS);
        timer.current = timer_id;
    }
    const start = () => {
        loop();
    }
    const stop = () =>{
        if(timer.current) {
            clearTimeout(timer.current);
        }
    } ;
    useEffect(() => {
        return () => clearTimeout(timer.current);
    }, []);

    return {timer, start, stop}
}

 export default useTimeoutLoop;