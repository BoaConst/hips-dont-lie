import React, { useState } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import Chatbot from 'react-chatbot-kit';
import axios from 'axios';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';
import ScrollToBottom from 'react-scroll-to-bottom';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  height: 400px;
  width: 400px;
  border: 1px solid #ccc;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f1f1;
  padding: 10px;
`;

const Title = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ChatbotWidget = () => {
  const [messages, setMessages] = useState([]);

  const handleNewUserMessage = async (newMessage) => {
    const response = await axios.post('/api/chatbot', {
      message: newMessage,
    });
    const botMessage = createChatBotMessage(response.data);
    setMessages([...messages, botMessage]);
  };

  const handleCloseWidget = () => {
    // handle widget close event
  };

  return (
    <Container>
      <Header>
        <Title>Chatbot</Title>
        <CloseButton onClick={handleCloseWidget}>
          <AiOutlineClose />
        </CloseButton>
      </Header>
      <ScrollToBottom>
        <Chatbot
          handleNewUserMessage={handleNewUserMessage}
          messages={messages}
          placeholder="Type your message here..."
          sendButton={<IoSend />}
        />
      </ScrollToBottom>
    </Container>
  );
};

export default ChatbotWidget;
