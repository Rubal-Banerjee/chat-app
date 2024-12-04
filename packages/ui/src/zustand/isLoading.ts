import { create } from "zustand";

interface Props {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const isLoading = create<Props>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
