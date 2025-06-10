
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { spawn } from 'child_process';

interface PasswordFormProps {
  language: 'de' | 'en';
  onHintClick: () => void;
  onLanguageToggle: () => void;
  'aria-labelledby'?: string;
  isLoading?: boolean;
}

const PasswordForm = ({ language, onHintClick, onLanguageToggle, 'aria-labelledby': ariaLabelledBy, isLoading = false }: PasswordFormProps) => {
  const [password, setPassword] = useState('');
  
  const t = {
    label: 'Hast du das Passwort?',
    placeholder: 'Passwort eingeben...',
    submit: 'Anmelden',
    hint: 'Probleme?',
    errors: {
      invalid_password: 'Ungültiges Passwort',
      rate_limit_exceeded: 'Zu viele Versuche. Bitte versuchen Sie es später erneut.',
      unknown_error: 'Ein unbekannter Fehler ist aufgetreten'
    }
  }
  
  return (
    <div
      id="login-section"
      className="w-full" role="region" aria-labelledby={ariaLabelledBy || "form-title"}>
      <div className="bg-gray-900 rounded-lg p-1 shadow-2xl border border-green-500/20">
        <div className="flex justify-between items-center mb-6">
          <h1 id="form-title" className="text-2xl font-bold text-green-400">globalworming heute</h1>
          <button
            id="language-toggle"
            onClick={onLanguageToggle}
            disabled={isLoading}
            className="px-3 py-1 text-sm bg-transparent text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label={`Change language to ${language === 'de' ? 'English' : 'German'}`}
            aria-disabled={isLoading}
            type="button"
          >
            Sprache:<br />  {(language === 'en' ? <span><u>EN</u> / DE</span> : <span>EN / <u>DE</u></span>)}
          </button>
        </div>
        
        <form 
          id="login-form"
          method="post" 
          action="https://login-598109592614.europe-west1.run.app/login" 
          className="space-y-6"
          aria-label="hast du das passwort?"
        >
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2" id="password-label">
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
              minLength={8}
              maxLength={256}
              autoComplete="current-password"
            />
          </div>

          <button
            id="submit-password"
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            aria-label={t.submit}
          >
            {t.submit}
          </button>
        </form>

        <div className="mt-2 text-center">
          <button
            id="problems-button"
            onClick={onHintClick}
            className="text-green-400 hover:text-green-300 underline text-sm transition-colors"
            type="button"
            aria-label={t.hint}
          >
            {t.hint}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
