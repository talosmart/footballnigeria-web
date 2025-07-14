import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface User {
  id: string;
  name: string;
  email: string;
  // Add any other user fields as needed
}

interface UserStore {
  user: User | null;
  loading: boolean;
  setUser: (data: User) => void;
  clearUser: () => void;
  setLoading: (isLoading: boolean) => void;
  refreshUser: () => Promise<void>;
}

// Fallback for SSR
const noopStorage = {
  getItem: (_key: string) => null,
  setItem: (_key: string, _value: string) => {},
  removeItem: (_key: string) => {},
};

export const useUserData = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      setUser: (data) => set({ user: data }),
      clearUser: () => set({ user: null }),
      setLoading: (isLoading) => set({ loading: isLoading }),

      refreshUser: async () => {
        set({ loading: true });
        try {
          const res = await fetch(`${API_URL}/user`);
          if (!res.ok) throw new Error('Failed to fetch user');

          const data = await res.json();
          set({ user: data.user, loading: false });
        } catch (err) {
          console.error('Refresh user failed:', err);
          set({ user: null, loading: false });
        }
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ user: state.user }),
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : noopStorage
      ),
    }
  )
);

export default useUserData;
