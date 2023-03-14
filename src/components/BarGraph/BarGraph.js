import React from 'react';
import PropTypes from 'prop-types';
import styles from './BarGraph.scss';

const BarGraph = props => (
	<div>This is a component called BarGraph.</div>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class BarGraph extends React.Component {
//   render() {
//     return <div>This is a component called BarGraph.</div>;
//   }
// }

const BarGraphPropTypes = {
	// always use prop types!
};

BarGraph.propTypes = BarGraphPropTypes;

export default BarGraph;
