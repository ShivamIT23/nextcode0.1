import { create } from 'zustand';

// Define the shape of the state
interface Message {
  role: string;
  content: string;
}

// Define the shape of the Zustand store
interface MessageState {
  message: Message;
  setMessage: (newMessage: Message) => void;
}

// Create the Zustand store
const useMessageStore = create<MessageState>((set) => ({
  message: { role: "", content: "" }, // Initial state
  setMessage: (newMessage) => set({ message: newMessage }), // Function to update state
}));

export default useMessageStore;



