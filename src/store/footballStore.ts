// store/footballStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FootballState {
  categories:[];
  posts:[];
  calendar:[];
  fixtures:[];
  liveFixtures:[];
  standings:[];
  matchPreview: [];
  loading: boolean;
  error: string | null;

  // actions
  setCategories: (categories:[]) => void;
  setPosts: (posts:[]) => void;
  setCalendar: (calendar:[]) => void;
  setFixtures: (fixtures:[]) => void;
  setLiveFixtures: (liveFixtures:[]) => void;
  setStandings: (standings:[]) => void;
  setMatchPreview: (matchPreview:[]) => void;
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
      standings: [],
      matchPreview: [],
      loading: false,
      error: null,

      setCategories: (categories) => set({ categories }),
      setPosts: (posts) => set({ posts }),
      setCalendar: (calendar) => set({ calendar }),
      setFixtures: (fixtures) => set({ fixtures }),
      setLiveFixtures: (liveFixtures) => set({ liveFixtures }),
      setStandings: (standings) => set({ standings }),
      setMatchPreview: (matchPreview) => set({ matchPreview }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      reset: () =>
        set({
          categories: [],
          posts: [],
          calendar: [],
          fixtures: [],
          liveFixtures: [],
          standings: [],
          matchPreview: [],
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
        standings: state.standings,
        matchPreview: state.matchPreview,
      }),
    }
  )
);
