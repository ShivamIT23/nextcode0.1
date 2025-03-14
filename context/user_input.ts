import { create } from 'zustand';

interface Message {
  role: string;
  content: string;
}

interface MessageState {
  message: Message[];
  setMessage: (newMessages: Message | Message[], append?: boolean) => void;
}

const useMessageStore = create<MessageState>((set) => ({
  message: [],
  setMessage: (newMessages, append = false) =>
    set((state) => {
      if (append) {
        return {
          message: Array.isArray(newMessages)
            ? [...state.message, ...newMessages]
            : [...state.message, newMessages],
        };
      } else {
        return {
          message: Array.isArray(newMessages) ? newMessages : [newMessages],
        };
      }
    }),
}));

export default useMessageStore;
