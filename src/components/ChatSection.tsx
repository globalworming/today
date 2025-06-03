
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatSectionRef } from '../types/chat';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';

interface ChatSectionProps {
}

const ChatSection = forwardRef<ChatSectionRef, ChatSectionProps>((props, ref) => {
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    sendMessage,
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="w-full mt-6" role="region" aria-label="Chat interface">
      <div className="bg-gray-900 rounded-lg border border-green-500/20 shadow-2xl" role="log" aria-live="polite" aria-atomic="false">
        <header className="p-4 border-b border-gray-700" aria-labelledby="chat-title">
          <h3 id="chat-title" className="text-lg font-semibold text-green-400">Support Chat</h3>
        </header>
        
        <MessageList 
          messages={messages} 
          isLoading={isLoading} 
          messagesEndRef={messagesEndRef} 
        />
        
        <ChatInput 
          onSendMessage={sendMessage} 
          isLoading={isLoading}
          inputRef={inputRef}
          aria-label="Chat message"
        />
      </div>
    </div>
  );
});

ChatSection.displayName = 'ChatSection';

export default ChatSection;
