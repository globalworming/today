
import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { chatTranslations } from '../../types/chat';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, inputRef }) => {
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
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
      <div className="flex space-x-2">
        <input
          ref={actualInputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={chatTranslations.placeholder}
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
      <p className="text-xs text-gray-400 mt-2 text-center">{chatTranslations.disclaimer}</p>
    </form>
  );
};

export default ChatInput;
