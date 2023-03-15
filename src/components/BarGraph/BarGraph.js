// import React, { Component } from 'react';
// import Plot from 'react-plotly.js';
// import data from '../../constants/data.json';

// class BarGraph extends Component {
//   render() {
//     // Extract x and y data from JSON
//     const xData = data.map(item => item.name);
//     const yData = data.map(item => item.value);

//     // Define data for Plotly graph
//     const graphData = [{
//       x: xData,
//       y: yData,
//       type: 'bar'
//     }];

//     // Define layout for Plotly graph
//     const graphLayout = {
//       title: 'Bar Graph',
//       xaxis: { title: 'X Axis' },
//       yaxis: { title: 'Y Axis' }
//     };

//     return (
//       <Plot
//         data={graphData}
//         layout={graphLayout}
//       />
//     );
//   }
// }

// export default BarGraph;
