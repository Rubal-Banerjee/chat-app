import { create } from "zustand";

interface UserProps {
  id: string;
  fullName: string;
  userName: string;
  profilePicture: string;
}

interface UserAuthProps {
  user: UserProps | null;
  setUser: (user: UserProps | null) => void;
  removeUser: () => void;
}

export const userAuth = create<UserAuthProps>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));
