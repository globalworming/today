declare global {
  interface Window {
    __triggerChatMessage?: (message: string, role?: string) => void;
  }
}

export {};
