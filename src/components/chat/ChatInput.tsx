
import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { chatTranslations } from '../../types/chat';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  'aria-label'?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, inputRef, 'aria-label': ariaLabel }) => {
  const [inputValue, setInputValue] = useState('');
  const localInputRef = useRef<HTMLInputElement>(null);
  
  // Use the provided ref or fall back to local ref
  const actualInputRef = inputRef || localInputRef;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const messageText = inputValue.trim();
    setInputValue('');
    onSendMessage(messageText);
  };

  return (
    <form 
      id="chat-form"
      onSubmit={handleSubmit} 
      className="p-1 border-t border-gray-700" 
      aria-label="Chat message form"
    >
      <div className="flex space-x-2" role="group">
        <input
          id="user-message-input"
          ref={actualInputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={chatTranslations.placeholder}
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={isLoading}
          aria-label={ariaLabel || "Message input"}
          aria-required="true"
          aria-disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (inputValue.trim() && !isLoading) {
                handleSubmit(e as unknown as React.FormEvent);
              }
            }
          }}
        />
        <button
          id="send-message"
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
          aria-disabled={isLoading || !inputValue.trim()}
        >
          <Send size={16} aria-hidden="true" />
        </button>
      </div>
      <p id="disclaimer" className="text-xs text-gray-400 mt-2 text-center" aria-live="polite">{chatTranslations.disclaimer}</p>
    </form>
  );
};

export default ChatInput;
