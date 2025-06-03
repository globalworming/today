
import { useState, useEffect } from 'react';
import { Message, chatTranslations } from '../types/chat';
import mcpTools from '../utils/mcpTools';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize chat with welcome message
    const welcomeMessage: Message = {
      text: chatTranslations.agentWelcome,
      sender: 'agent',
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
    // fetch, POST https://chat-598109592614.europe-west1.run.app with body
    const response = await fetch('https://chat-598109592614.europe-west1.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer AIzaSyCeQaGPWswIuWYCT6ELXc9nvDKn-egonb1`
      },
      body: JSON.stringify({
        messageHistory,
        htmlb64: btoa(document.body.innerHTML)
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
        text: processedResponse,
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error: any) {
      let errorMessage = chatTranslations.errorGeneric;
      
      if (error.status === 429) {
        errorMessage = chatTranslations.errorRateLimit;
      }

      const errorAgentMessage: Message = {
        text: errorMessage,
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorAgentMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = (messageText: string) => {
    const userMessage: Message = {
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
