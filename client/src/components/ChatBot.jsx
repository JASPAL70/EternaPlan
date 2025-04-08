import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FiSend } from "react-icons/fi"; 
import config from "../config"; 

// Styled Components
const ChatbotIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #916f55;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
  font-size: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(175, 140, 113);
    transform: scale(1.1);
  }

  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 80px;
  right: 10px;
  width: calc(100% - 20px);
  max-width: 400px;
  height: 70vh;
  max-height: 600px;
  background: #916f55;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border: 1px solid #916f55;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(20px)'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  overflow: hidden;

  @media (min-width: 768px) {
    bottom: 90px;
    right: 20px;
    width: 400px;
    height: 600px;
  }
`;

const ChatHeader = styled.div`
  background-color: #916f55;
  padding: 12px 15px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 20px;
    padding: 15px;
  }
`;

const CloseButton = styled.span`
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f9f9f9;
  scroll-behavior: smooth;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #916f55;
    border-radius: 3px;
  }

  @media (min-width: 768px) {
    padding: 15px;
  }
`;

const ChatMessage = styled.div`
  margin: 8px 0;
  display: flex;
  flex-direction: ${(props) => (props.sender === "user" ? "row-reverse" : "row")};
  align-items: flex-start;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (min-width: 768px) {
    margin: 10px 0;
  }
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.sender === "user" ? "rgb(132, 131, 131)" : "#e0e0e0")};
  color: ${(props) => (props.sender === "user" ? "white" : "black")};
  padding: 8px 12px;
  border-radius: ${(props) =>
    props.sender === "user" ? "12px 12px 0 12px" : "12px 12px 12px 0"};
  font-size: 14px;
  max-width: 80%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.4;
  word-break: break-word;

  @media (min-width: 768px) {
    padding: 10px 15px;
    font-size: 16px;
    max-width: 70%;
    border-radius: ${(props) =>
      props.sender === "user" ? "15px 15px 0 15px" : "15px 15px 15px 0"};
  }
`;

const ChatInputWrapper = styled.div`
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    padding: 15px;
  }
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #916f55;
  }

  @media (min-width: 768px) {
    padding: 12px;
    font-size: 16px;
    border-radius: 8px;
  }
`;

const SendButton = styled.button`
  padding: 10px;
  margin-left: 8px;
  border: none;
  background-color: #916f55;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(176, 139, 110);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: 12px;
    margin-left: 10px;
    font-size: 18px;
    border-radius: 8px;
  }
`;

const LoadingDots = styled.div`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 20px;

  div {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #916f55;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }

  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }

  @keyframes lds-ellipsis3 {
    0% { transform: scale(1); }
    100% { transform: scale(0); }
  }

  @keyframes lds-ellipsis2 {
    0% { transform: translate(0, 0); }
    100% { transform: translate(24px, 0); }
  }
`;

const ChatBot = ({ userData }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatBotResponse = (text) => {
    let cleanedText = text.replace(/\*\*/g, '').replace(/\*/g, '');
    cleanedText = cleanedText.split('\n').map(line => line.trim()).join('\n');
    cleanedText = cleanedText.split('\n').filter(line => line.trim() !== '').join('\n');
    cleanedText = cleanedText.replace(/([a-z])([A-Z])/g, '$1\n\n$2');
    cleanedText = cleanedText.split('\n\n').map(para => {
      if (para.length > 0) {
        return para.charAt(0).toUpperCase() + para.slice(1);
      }
      return para;
    }).join('\n\n');
    return cleanedText;
  };

  const handleChatInput = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMessage = { text: chatInput, sender: "user" };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsLoading(true);

    try {
      const context = `
        User is planning an event with these details:
        Activity: ${userData.activity || "Not specified"},
        Budget: ₹${userData.budget || "Not specified"},
        Duration: ${userData.days || "Not specified"} days,
        Guests: ${userData.guests || "Not specified"},
        Location: ${userData.location || "Not specified"},
        Date: ${userData.date || "Not specified"}
        
        Please provide specific, organized suggestions in clear paragraphs without markdown formatting.
        Focus on practical recommendations that match these parameters.
      `;

      const chatResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `${context}\n\nUser's specific question: ${chatInput}\n\nPlease respond in clear, formatted paragraphs without markdown symbols.`,
                },
              ],
            },
          ],
        }
      );

      const rawResponse = chatResponse.data.candidates[0]?.content.parts[0]?.text || "I couldn't generate a response. Please try again.";
      const formattedResponse = formatBotResponse(rawResponse);
      
      const botMessage = {
        text: formattedResponse,
        sender: "bot",
      };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error with chatbot API:", error);
      const errorMessage = {
        text: "Sorry, I encountered an error. Please try again later.",
        sender: "bot",
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ChatbotIcon onClick={() => setChatOpen(!chatOpen)}>💬</ChatbotIcon>

      <ChatWindow isOpen={chatOpen}>
        <ChatHeader>
          Event Planning Assistant
          <CloseButton onClick={() => setChatOpen(false)}>✖</CloseButton>
        </ChatHeader>
        <ChatBody>
          {chatMessages.length === 0 && (
            <ChatMessage sender="bot">
              <MessageBubble sender="bot">
                Hello! I'm your event planning assistant. How can I help you with your {userData.activity || "event"} today?
              </MessageBubble>
            </ChatMessage>
          )}
          {chatMessages.map((msg, index) => (
            <ChatMessage key={index} sender={msg.sender}>
              <MessageBubble sender={msg.sender}>
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </MessageBubble>
            </ChatMessage>
          ))}
          {isLoading && (
            <ChatMessage sender="bot">
              <MessageBubble sender="bot">
                <LoadingDots>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </LoadingDots>
              </MessageBubble>
            </ChatMessage>
          )}
        </ChatBody>
        <ChatInputWrapper>
          <form style={{ display: "flex", width: "100%" }} onSubmit={handleChatInput}>
            <ChatInput
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about your event..."
              disabled={isLoading}
            />
            <SendButton type="submit" disabled={isLoading || !chatInput.trim()}>
              <FiSend />
            </SendButton>
          </form>
        </ChatInputWrapper>
      </ChatWindow>
    </>
  );
};

export default ChatBot;
