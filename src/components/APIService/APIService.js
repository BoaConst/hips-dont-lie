import React from 'react';
import PropTypes from 'prop-types';
import styles from './APIService.scss';

const APIService = props => (
	<div>This is a component called APIService.</div>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class APIService extends React.Component {
//   render() {
//     return <div>This is a component called APIService.</div>;
//   }
// }

const APIServicePropTypes = {
	// always use prop types!
};

APIService.propTypes = APIServicePropTypes;

export default APIService;
