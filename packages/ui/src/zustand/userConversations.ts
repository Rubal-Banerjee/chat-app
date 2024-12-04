import { create } from "zustand";

export interface ConversationProps {
  id: string;
  fullName: string;
  profilePicture: string | null;
}

interface MessageProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  message: string;
  senderId: string;
  conversationId: string;
}

interface UserConversations {
  selectedConversation: ConversationProps | null;
  messages: MessageProps[];
  setSelectedConversations: (
    selectedConversation: ConversationProps | null
  ) => void;
  setMessages: (messages: MessageProps[]) => void;
}

export const userConversations = create<UserConversations>((set) => ({
  selectedConversation: null,
  messages: [],
  setSelectedConversations: (selectedConversation) =>
    set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
}));
