import { useEffect, useState } from "react";

// This is a very simplistic approach for timers and it works when the time to countdown from is small like a minute or two
// More information can be found https://medium.com/@bsalwiczek/building-timer-in-react-its-not-as-simple-as-you-may-think-80e5f2648f9b   
// and here https://overreacted.io/making-setinterval-declarative-with-react-hooks/   
const useCountdown = (expiryTimestamp, onComplete, onTimerReset) => {

    const [seconds, setSeconds] = useState(expiryTimestamp)
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        setIsActive(!isActive);
    }

    const reset = () => {
        setIsActive(false);
        setSeconds(expiryTimestamp);
        onTimerReset();
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            if (seconds > 0) {
                interval = setInterval(() => {
                    setSeconds(seconds => seconds - 1);
                }, 1000); // decrements seconds every 1s
            } else {
                setSeconds(expiryTimestamp);
                toggle();
                onComplete();
            }
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, expiryTimestamp, onComplete, toggle])

    return [seconds, isActive, toggle, reset]
}

export {useCountdown};
