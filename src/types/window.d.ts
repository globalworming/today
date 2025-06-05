declare global {
  interface Window {
    __triggerChatMessage?: (message: string) => void;
  }
}

export {};
