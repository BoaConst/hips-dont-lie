import React from 'react';
import { shallow, render, mount } from 'enzyme';
import TileWithBarGraph from './TileWithBarGraph';

describe('TileWithBarGraph', () => {
  let props;
  let shallowTileWithBarGraph;
  let renderedTileWithBarGraph;
  let mountedTileWithBarGraph;

  const shallowTestComponent = () => {
    if (!shallowTileWithBarGraph) {
      shallowTileWithBarGraph = shallow(<TileWithBarGraph {...props} />);
    }
    return shallowTileWithBarGraph;
  };

  const renderTestComponent = () => {
    if (!renderedTileWithBarGraph) {
      renderedTileWithBarGraph = render(<TileWithBarGraph {...props} />);
    }
    return renderedTileWithBarGraph;
  };

  const mountTestComponent = () => {
    if (!mountedTileWithBarGraph) {
      mountedTileWithBarGraph = mount(<TileWithBarGraph {...props} />);
    }
    return mountedTileWithBarGraph;
  };  

  beforeEach(() => {
    props = {};
    shallowTileWithBarGraph = undefined;
    renderedTileWithBarGraph = undefined;
    mountedTileWithBarGraph = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
