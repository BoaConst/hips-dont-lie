import { useState, useEffect } from "react"

const useShuffle = (data, counter) => {

    const [state, setState] = useState([])
    const [internalCounter, setInternalCounter] = useState(-1);
     
    useEffect(() => {
        if (internalCounter !== counter){
            if (data !== undefined && data.length > 0) {
                const newList = [];

                for (let i = 0; i < data.length; i++){
                    newList.push([data[i], i]);
                }
                for (let i = newList.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    const temp = newList[i];
                    newList[i] = newList[j];
                    newList[j] = temp;
                }
                const newMap = new Map();

                for (let i = 0; i < newList.length; i++){
                    newMap.set(newList[i][1], newList[i][0]);
                }
                setState(newMap)
                setInternalCounter(counter);
            }
        }
        else {
            const temp = new Map();
            for (let [k, v] of state){
                temp.set(k, v);
            }
            for (let i = 0; i < temp.size; i++){
                temp.set(i, data[i]);
            }
            setState(temp);
        }
    }, [setState, counter, data])

    return [state]
}

export {useShuffle}
