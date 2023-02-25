import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ChatBotWidget from './ChatBotWidget';

describe('ChatBotWidget', () => {
  let props;
  let shallowChatBotWidget;
  let renderedChatBotWidget;
  let mountedChatBotWidget;

  const shallowTestComponent = () => {
    if (!shallowChatBotWidget) {
      shallowChatBotWidget = shallow(<ChatBotWidget {...props} />);
    }
    return shallowChatBotWidget;
  };

  const renderTestComponent = () => {
    if (!renderedChatBotWidget) {
      renderedChatBotWidget = render(<ChatBotWidget {...props} />);
    }
    return renderedChatBotWidget;
  };

  const mountTestComponent = () => {
    if (!mountedChatBotWidget) {
      mountedChatBotWidget = mount(<ChatBotWidget {...props} />);
    }
    return mountedChatBotWidget;
  };  

  beforeEach(() => {
    props = {};
    shallowChatBotWidget = undefined;
    renderedChatBotWidget = undefined;
    mountedChatBotWidget = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
