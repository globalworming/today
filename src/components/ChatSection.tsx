import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, Loader2 } from 'lucide-react';
import mcpTools from '../utils/mcpTools';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatSectionProps {
}

interface ChatSectionRef {
  sendMessage: (message: string) => void;
}

const ChatSection = forwardRef<ChatSectionRef, ChatSectionProps>((props, ref) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    placeholder: 'Ihre Nachricht...',
    send: 'Senden',
    agentWelcome: 'Wie kann ich helfen?',
    userProblem: 'Ich habe Probleme',
    errorGeneric: 'Entschuldigung, es gab ein Problem. Bitte versuchen Sie es erneut.',
    errorRateLimit: 'Zu viele Nachrichten. Bitte warten Sie einen Moment.',
    typing: 'Agent tippt...'
  };

  useImperativeHandle(ref, () => ({
    sendMessage: (message: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      handleAgentResponse([...messages, userMessage]);
    }
  }));

  useEffect(() => {
    // Initialize chat with welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: t.agentWelcome,
      sender: 'agent',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, [t.agentWelcome]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    // Mock Gemini API call for development
    // In production, this would call the actual Gemini API
    const mockResponses = [
      'Ich verstehe Ihr Problem. Können Sie mir mehr Details geben?',
      'Lassen Sie mich Ihnen dabei helfen.',
      'Das ist ein bekanntes Problem. Hier ist die Lösung...',
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simulate occasional errors
    if (Math.random() < 0.1) {
      throw new Error('API Error');
    }
    
    if (Math.random() < 0.05) {
      const error = new Error('Rate limit exceeded');
      (error as any).status = 429;
      throw error;
    }
    
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  };

  const handleAgentResponse = async (messageHistory: Message[]) => {
    setIsLoading(true);

    try {
      const response = await callGeminiAPI(messageHistory);
      const processedResponse = await processMCPCalls(response);
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: processedResponse,
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error: any) {
      let errorMessage = t.errorGeneric;
      
      if (error.status === 429) {
        errorMessage = t.errorRateLimit;
      }

      const errorAgentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorAgentMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const messageText = inputValue.trim();
    setInputValue('');

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    handleAgentResponse([...messages, userMessage]);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="bg-gray-900 rounded-lg border border-green-500/20 shadow-2xl">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-green-400">Support Chat</h3>
        </div>
        
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-60">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">{t.typing}</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

ChatSection.displayName = 'ChatSection';

export default ChatSection;
