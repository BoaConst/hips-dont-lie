import React from 'react';
import { shallow, render, mount } from 'enzyme';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  let props;
  let shallowSearchBar;
  let renderedSearchBar;
  let mountedSearchBar;

  const shallowTestComponent = () => {
    if (!shallowSearchBar) {
      shallowSearchBar = shallow(<SearchBar {...props} />);
    }
    return shallowSearchBar;
  };

  const renderTestComponent = () => {
    if (!renderedSearchBar) {
      renderedSearchBar = render(<SearchBar {...props} />);
    }
    return renderedSearchBar;
  };

  const mountTestComponent = () => {
    if (!mountedSearchBar) {
      mountedSearchBar = mount(<SearchBar {...props} />);
    }
    return mountedSearchBar;
  };  

  beforeEach(() => {
    props = {};
    shallowSearchBar = undefined;
    renderedSearchBar = undefined;
    mountedSearchBar = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
