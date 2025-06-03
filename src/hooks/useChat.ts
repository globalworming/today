
import { useState, useEffect } from 'react';
import { Message, chatTranslations } from '../types/chat';
import mcpTools from '../utils/mcpTools';
import { Base64 } from 'js-base64';

// The API endpoint URL
const API_URL = 'https://chat-598109592614.europe-west1.run.app';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize chat with welcome message
    const welcomeMessage: Message = {
      id: '0',
      text: chatTranslations.agentWelcome,
      sender: 'model',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, []);

  const processMCPCalls = async (response: string): Promise<string> => {
    const { calls, cleanText } = mcpTools.extractMCPCalls(response);
    
    // Execute all MCP calls
    for (const call of calls) {
      try {
        await mcpTools.executeMCPCall(call);
      } catch (error) {
        console.error('Failed to execute MCP call:', error);
      }
    }
    
    return cleanText;
  };

  const callGeminiAPI = async (messageHistory: Message[]): Promise<string> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer AIzaSyCeQaGPWswIuWYCT6ELXc9nvDKn-egonb1`
      },
      body: JSON.stringify({
        messageHistory,
        htmlb64: Base64.encode(document.body.innerHTML)
      })
    });
    return response.text();
  };

  const handleAgentResponse = async (messageHistory: Message[]) => {
    setIsLoading(true);

    try {
      const response = await callGeminiAPI(messageHistory);
      const processedResponse = await processMCPCalls(response);
      
      const agentMessage: Message = {
        id: (messageHistory.length + 1).toString(),
        text: processedResponse,
        sender: 'model',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error: any) {
      console.error('Error in handleAgentResponse:', error);
      let errorMessage = chatTranslations.errorGeneric;
      
      if (error.status === 429) {
        errorMessage = chatTranslations.errorRateLimit;
      }

      const errorAgentMessage: Message = {
        id: (messageHistory.length + 1).toString(),
        text: errorMessage,
        sender: 'model',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorAgentMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = (messageText: string) => {
    const userMessage: Message = {
      id: (messages.length + 1).toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    handleAgentResponse(newMessages);
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
};
