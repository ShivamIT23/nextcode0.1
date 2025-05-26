import { create } from "zustand";

interface liveAIMessageType {
  liveAIMessage: string;
  setLiveAIMessage: (newUser: string) => void;
  refreshAIMessafe: () => void;
}

const liveAIMessageState = create<liveAIMessageType>((set) => ({
  liveAIMessage: "",
  setLiveAIMessage: (newliveAIMessage) =>
    set((state) => ({ liveAIMessage: state.liveAIMessage + newliveAIMessage })),
  refreshAIMessafe: () => set({ liveAIMessage: "" }),
}));

export default liveAIMessageState;

interface liveAIExplanationType {
  explanation: string;
  setExplanation: (newUser: string) => void;
  refreshExplanation: () => void;
}

export const liveAIExplanationState = create<liveAIExplanationType>((set) => ({
  explanation: "",
  setExplanation: (newExp) =>
    set((state) => ({ explanation: state.explanation + newExp })),
  refreshExplanation: () => set({ explanation: "" }),
}));
