import React from "react";

const DeviceOrientation = ({callback}) => {

    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', function (event) {
            callback([event.alpha, event.beta, event.gamma]);
        });
    } else {
        console.log('Device not supported');
    }

    return (
        <>
        </>
    )

}

export default DeviceOrientation;
