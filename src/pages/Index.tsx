
import React, { useState } from 'react';
import PasswordForm from '../components/PasswordForm';
import ChatSection from '../components/ChatSection';

const Index = () => {
  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const [showChat, setShowChat] = useState(false);

  const handleHintClick = () => {
    setShowChat(true);
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === 'de' ? 'en' : 'de';
    const message = language === 'de' 
      ? 'Bitte die Seite auf English umstellen'
      : 'Diese Seite bitte auf Deutsch übersetzen';
    
    // If chat is open, send the language request message
    if (showChat) {
      // This would trigger the chat to send the message
      console.log('Language request:', message);
    }
    
    // Toggle language after a short delay to simulate processing
    setTimeout(() => {
      setLanguage(newLanguage);
    }, 1000);
  };

  const handleLanguageRequest = (message: string) => {
    console.log('Language request from chat:', message);
    handleLanguageToggle();
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
            language={language}
            onLanguageRequest={handleLanguageRequest}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
