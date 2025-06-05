
import React, { useState, useRef } from 'react';
import { ChatSectionRef } from '../types/chat';
import PasswordForm from '../components/PasswordForm';
import ChatSection from '../components/ChatSection';

const Index = () => {
  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const [showChat, setShowChat] = useState(false);
  const chatRef = useRef<ChatSectionRef>(null);

  const handleHintClick = () => {
    setShowChat(true);
    
    // Focus the chat input after a short delay to ensure the component is mounted
    setTimeout(() => {
      chatRef.current?.focus();
    }, 100);
  };

  const handleLanguageToggle = () => {
    setShowChat(true);
    setLanguage(language === 'de' ? 'en' : 'de');
    const message = language === 'de' 
      ? 'please translate this page to English'
      : 'Seite bitte auf Deutsch übersetzen';
    
    // Send the translation request message to chat
    setTimeout(() => {
      chatRef.current?.sendMessage(message);
    }, 100);
  };

  return (
    <main id="puzzle" className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-1" role="main" aria-label="Login and chat interface">
      <div className="w-full max-w-2xl">
        <PasswordForm
          language={language}
          onHintClick={handleHintClick}
          onLanguageToggle={handleLanguageToggle}
          aria-labelledby="form-title"
        />
        
        {showChat && (
          <section id="chat-section" aria-labelledby="chat-section" className="mt-4">
            <h2 id="chat-section" className="sr-only">Chat Section</h2>
            <ChatSection
              ref={chatRef}
            />  
          </section>
        )}
      </div>
    </main>
  );
};

export default Index;
