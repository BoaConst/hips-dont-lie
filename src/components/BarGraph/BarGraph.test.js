import React from 'react';
import { shallow, render, mount } from 'enzyme';
import BarGraph from './BarGraph';

describe('BarGraph', () => {
  let props;
  let shallowBarGraph;
  let renderedBarGraph;
  let mountedBarGraph;

  const shallowTestComponent = () => {
    if (!shallowBarGraph) {
      shallowBarGraph = shallow(<BarGraph {...props} />);
    }
    return shallowBarGraph;
  };

  const renderTestComponent = () => {
    if (!renderedBarGraph) {
      renderedBarGraph = render(<BarGraph {...props} />);
    }
    return renderedBarGraph;
  };

  const mountTestComponent = () => {
    if (!mountedBarGraph) {
      mountedBarGraph = mount(<BarGraph {...props} />);
    }
    return mountedBarGraph;
  };  

  beforeEach(() => {
    props = {};
    shallowBarGraph = undefined;
    renderedBarGraph = undefined;
    mountedBarGraph = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
