
import React, { useState, useRef } from 'react';
import PasswordForm from '../components/PasswordForm';
import ChatSection from '../components/ChatSection';

const Index = () => {
  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const [showChat, setShowChat] = useState(false);
  const chatRef = useRef<{ sendMessage: (message: string) => void }>(null);

  const handleHintClick = () => {
    setShowChat(true);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <PasswordForm
          language={language}
          onHintClick={handleHintClick}
          onLanguageToggle={handleLanguageToggle}
        />
        
        {showChat && (
          <ChatSection
            ref={chatRef}
          />  
        )}
      </div>
    </div>
  );
};

export default Index;
