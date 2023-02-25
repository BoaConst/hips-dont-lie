import React from 'react';
import { shallow, render, mount } from 'enzyme';
import UserExerciseTesting from './UserExerciseTesting';

describe('UserExerciseTesting', () => {
  let props;
  let shallowUserExerciseTesting;
  let renderedUserExerciseTesting;
  let mountedUserExerciseTesting;

  const shallowTestComponent = () => {
    if (!shallowUserExerciseTesting) {
      shallowUserExerciseTesting = shallow(<UserExerciseTesting {...props} />);
    }
    return shallowUserExerciseTesting;
  };

  const renderTestComponent = () => {
    if (!renderedUserExerciseTesting) {
      renderedUserExerciseTesting = render(<UserExerciseTesting {...props} />);
    }
    return renderedUserExerciseTesting;
  };

  const mountTestComponent = () => {
    if (!mountedUserExerciseTesting) {
      mountedUserExerciseTesting = mount(<UserExerciseTesting {...props} />);
    }
    return mountedUserExerciseTesting;
  };  

  beforeEach(() => {
    props = {};
    shallowUserExerciseTesting = undefined;
    renderedUserExerciseTesting = undefined;
    mountedUserExerciseTesting = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
