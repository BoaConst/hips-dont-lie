import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { useEffect } from 'react';
import pizza_by_type_data from '../../constants/pizza_by_type_data.json';
import gross_value_of_each_type from '../../constants/gross_value_of_each_type.json';
import gross_value_per_capita_of_each_type from '../../constants/gross_value_per_capita_of_each_type.json';
import user_order_count from '../../constants/user_order_count.json';
import { getUsers } from '../APIService/APIService';

function TileWithBarGraph() {

	const [users, setUsers] = useState([]);
	

	useEffect(() => {
		getUsers().then(response => {
			setUsers(response.data);
		});
	}, []);

	const listUsers = users.map((user) => <li> {user.name}</li>)

  // Extract x and y data from JSON
  const xData = pizza_by_type_data.map(item => item.name);
  const yData = pizza_by_type_data.map(item => item.value);

  // Define data for Plotly graph
  const graphData = [{
	x: xData,
	y: yData,
	type: 'bar'
  }];

  // Define layout for Plotly graph
  const graphLayout = {
	title: 'Sales in the last year by pizza type',
	xaxis: { title: 'Pizza Type' },
	yaxis: { title: 'Sales' }
  };

  // Extract x and y data from JSON
  const xData0 = gross_value_of_each_type.map(item => item.name);
  const yData0 = gross_value_of_each_type.map(item => item.value);

  // Define data for Plotly graph
  const graphData0 = [{
	x: xData0,
	y: yData0,
	type: 'bar'
  }];

  // Define layout for Plotly graph
  const graphLayout0 = {
	title: 'Gross Value in the last year by type',
	xaxis: { title: 'Pizza Type' },
	yaxis: { title: 'Gross Value' }
  };

  // Extract x and y data from JSON
  const xData1 = gross_value_per_capita_of_each_type.map(item => item.name);
  const yData1 = gross_value_per_capita_of_each_type.map(item => item.value);

  // Define data for Plotly graph
  const graphData1 = [{
	x: xData1,
	y: yData1,
	type: 'bar'
  }];

  // Define layout for Plotly graph
  const graphLayout1 = {
	title: 'Gross Value Per Capita in the last year by type',
	xaxis: { title: 'Pizza Type' },
	yaxis: { title: 'Gross Value Per Capita' }
  };

  // Extract x and y data from JSON
  const xData2 = user_order_count.map(item => item.name);
  const yData2 = user_order_count.map(item => item.value);

  // Define data for Plotly graph
  const graphData2= [{
	x: xData2,
	y: yData2,
	type: 'bar'
  }];

  // Define layout for Plotly graph
  const graphLayout2 = {
	title: 'Order Count by Unique Customers',
	xaxis: { title: 'Unique Customers' },
	yaxis: { title: 'Order Count' }
  };

  return (
	<div>
<ul>
    {listUsers}
  </ul>

	{/* <div style={{ display: "grid"}}>
        <Plot
          data={graphData}
          layout={graphLayout}
        />
		<Plot
          data={graphData0}
          layout={graphLayout0}
        />
		
      </div>
	  <div style={{ display: "grid"}}>
        <Plot
          data={graphData1}
          layout={graphLayout1}
        />
		<Plot
          data={graphData2}
          layout={graphLayout2}
        />
		
      </div> */}

	  </div>
  );
}

export default TileWithBarGraph;
