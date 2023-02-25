import React from 'react';
import { shallow, render, mount } from 'enzyme';
import HealthInformationLanding from './HealthInformationLanding';

describe('HealthInformationLanding', () => {
  let props;
  let shallowHealthInformationLanding;
  let renderedHealthInformationLanding;
  let mountedHealthInformationLanding;

  const shallowTestComponent = () => {
    if (!shallowHealthInformationLanding) {
      shallowHealthInformationLanding = shallow(<HealthInformationLanding {...props} />);
    }
    return shallowHealthInformationLanding;
  };

  const renderTestComponent = () => {
    if (!renderedHealthInformationLanding) {
      renderedHealthInformationLanding = render(<HealthInformationLanding {...props} />);
    }
    return renderedHealthInformationLanding;
  };

  const mountTestComponent = () => {
    if (!mountedHealthInformationLanding) {
      mountedHealthInformationLanding = mount(<HealthInformationLanding {...props} />);
    }
    return mountedHealthInformationLanding;
  };  

  beforeEach(() => {
    props = {};
    shallowHealthInformationLanding = undefined;
    renderedHealthInformationLanding = undefined;
    mountedHealthInformationLanding = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
