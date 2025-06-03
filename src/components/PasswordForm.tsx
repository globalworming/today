
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface PasswordFormProps {
  language: 'de' | 'en';
  onHintClick: () => void;
  onLanguageToggle: () => void;
}

const PasswordForm = ({ language, onHintClick, onLanguageToggle }: PasswordFormProps) => {
  const [password, setPassword] = useState('');
  
  const t = {
    label: 'Hast du das Passwort?',
    placeholder: 'Passwort eingeben...',
    submit: 'Anmelden',
    hint: 'Probleme?',
    langButton: 'EN ' + (language === 'en' ? '< -' : '- >') + ' DE',
    errors: {
      invalid_password: 'Ungültiges Passwort',
      rate_limit_exceeded: 'Zu viele Versuche. Bitte versuchen Sie es später erneut.',
      unknown_error: 'Ein unbekannter Fehler ist aufgetreten'
    }
  }
  
  // Get error from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const errorKey = urlParams.get('error') as keyof typeof t.errors | null;
  const errorMessage = errorKey ? t.errors[errorKey] : null;


  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-900 rounded-lg p-8 shadow-2xl border border-green-500/20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-400">globalworming.today</h1>
          <button
            onClick={onLanguageToggle}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            {t.langButton}
          </button>
        </div>
        
        <form method="post" action="https://login-598109592614.europe-west1.run.app/login" className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              {t.label}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.placeholder}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {errorMessage && (
            <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-500/20">
              <AlertCircle size={16} />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            {t.submit}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onHintClick}
            className="text-green-400 hover:text-green-300 underline text-sm transition-colors"
          >
            {t.hint}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
