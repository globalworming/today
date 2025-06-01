
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
    setShowChat(true);
    setLanguage(language === 'de' ? 'en' : 'de');
    const message = language === 'de' 
      ? 'please translate this page to English'
      : 'Seite bitte auf Deutsch übersetzen';
    // FIXME: send chat message
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
          />  
        )}
      </div>
    </div>
  );
};

export default Index;
