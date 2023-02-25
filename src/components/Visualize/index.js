import React from "react";
import Plot from 'react-plotly.js'
import { Content, Wrapper } from "./index.styles";

const Visualize = ({xData, yData, zData, legends, colors=['rgb(188,195,113)'], lineX = [], lineY = [], lineZ = []}) => {
    const data = []
    console.log(xData, yData, zData);
    for (let i = 0; i < xData.length; i++) {
        const trace = {
            x: xData[i],
            y: yData[i],
            z: zData[i],
            type: "scatter3d",
            mode: "markers",
            marker: {
                size: 5,
                color: colors[i],
                symbol: 'circle',
                lines: {
                    color: 'rgb(127,127,127)',
                    wdith: 1,
                    opacity: 0.8
                }
            },
            // name: legends[i]
        };
        data.push(trace);
    }

    const lineTrace = {
        x: lineX,
        y: lineY,
        z: lineZ,
        type: "scatter3d",
        mode: "lines",
        name: "line"
    }
    data.push(lineTrace);
    
    const layout = {
        font: { size: 15 },
        scene: {
            xaxis: { title: 'Red' },
            yaxis: { title: 'Green' },
            zaxis: { title: 'Blue' },
            aspectmode: 'cube'
        }
    };
    // const config = {responsive: true};

    return (
        <Wrapper>
            <Content>
                <Plot data={data} layout={layout}></Plot>
            </Content>
        </Wrapper>
    )
}

export default Visualize;
