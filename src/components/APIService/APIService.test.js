import React from 'react';
import { shallow, render, mount } from 'enzyme';
import APIService from './APIService';

describe('APIService', () => {
  let props;
  let shallowAPIService;
  let renderedAPIService;
  let mountedAPIService;

  const shallowTestComponent = () => {
    if (!shallowAPIService) {
      shallowAPIService = shallow(<APIService {...props} />);
    }
    return shallowAPIService;
  };

  const renderTestComponent = () => {
    if (!renderedAPIService) {
      renderedAPIService = render(<APIService {...props} />);
    }
    return renderedAPIService;
  };

  const mountTestComponent = () => {
    if (!mountedAPIService) {
      mountedAPIService = mount(<APIService {...props} />);
    }
    return mountedAPIService;
  };  

  beforeEach(() => {
    props = {};
    shallowAPIService = undefined;
    renderedAPIService = undefined;
    mountedAPIService = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
