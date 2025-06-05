
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Message, chatTranslations } from '../../types/chat';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div 
      id="chat-messages"
      className="h-80 overflow-y-auto p-1 space-y-4" 
      role="log" 
      aria-live="polite" 
      aria-relevant="additions"
      aria-label="Chat message history"
      tabIndex={0}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          id={`message-${message.id}`}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          role="article"
          aria-label={`${message.sender === 'user' ? 'You' : 'Assistant'} said`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-lg ${
              message.sender === 'user'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-100'
            }`}
          >
            <p className="text-sm">{message.text}</p>
            <time 
              id={`message-time-${message.id}`}
              className="text-xs mt-1 opacity-60"
              dateTime={message.timestamp.toISOString()}
              aria-label={`Sent at ${message.timestamp.toLocaleTimeString()}`}
            >
              {message.timestamp.toLocaleTimeString()}
            </time>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div id="loading-message" className="flex justify-start" role="status" aria-live="assertive">
          <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              <span className="text-sm">{chatTranslations.typing}</span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} aria-hidden="true" />
    </div>
  );
};

export default MessageList;
