
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'model';
  timestamp: Date;
}

export interface ChatSectionRef {
  sendMessage: (message: string) => void;
}

export const chatTranslations = {
  placeholder: 'Ihre Nachricht...',
  send: 'Senden',
  agentWelcome: 'Wie kann ich helfen?',
  userProblem: 'Ich habe Probleme',
  errorGeneric: 'Entschuldigung, es gab ein Problem. Bitte versuchen Sie es erneut.',
  errorRateLimit: 'Zu viele Nachrichten. Bitte warten Sie einen Moment.',
  typing: '...',
  disclaimer: 'Generierte Nachrichten können falsch und schädlich sein, bitte verwenden Sie sie mit Vorsicht. Bitte teile keine persönlichen Daten mit dem Chatbot.'
};
