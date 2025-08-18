// store/footballStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FootballState {
  categories:[];
  posts:[];
  calendar:[];
  fixtures:[];
  liveFixtures:[];
  loading: boolean;
  error: string | null;

  // actions
  setCategories: (categories:[]) => void;
  setPosts: (posts:[]) => void;
  setCalendar: (calendar:[]) => void;
  setFixtures: (fixtures:[]) => void;
  setLiveFixtures: (fixtures:[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useFootballStore = create<FootballState>()(
  persist(
    (set) => ({
      categories: [],
      posts: [],
      calendar: [],
      fixtures: [],
      liveFixtures: [],
      loading: false,
      error: null,

      setCategories: (categories) => set({ categories }),
      setPosts: (posts) => set({ posts }),
      setCalendar: (calendar) => set({ calendar }),
      setFixtures: (fixtures) => set({ fixtures }),
      setLiveFixtures: (liveFixtures) => set({ liveFixtures }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      reset: () =>
        set({
          categories: [],
          posts: [],
          calendar: [],
          fixtures: [],
          liveFixtures: [],
          loading: false,
          error: null,
        }),
    }),
    {
      name: "football-storage", // storage key in localStorage
      partialize: (state) => ({
        categories: state.categories,
        posts: state.posts,
        calendar: state.calendar,
        fixtures: state.fixtures,
        liveFixtures: state.liveFixtures,
      }),
    }
  )
);
