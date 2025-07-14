import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  token: string | null;
  hydrated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
  setHydrated: (value: boolean) => void;
}

const noopStorage = {
  getItem: (_key: string) => null,
  setItem: (_key: string, _value: string) => {},
  removeItem: (_key: string) => {},
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      hydrated: false,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : noopStorage
      ),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true); 
      },
    }
  )
);
