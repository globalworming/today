
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
              <span className="text-sm">{chatTranslations.typing}</span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
