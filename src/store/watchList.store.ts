import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TrendingMovie, TrendingTvShow } from '#/models/trending.ts'

export interface WatchListState {
  watchList: (TrendingMovie | TrendingTvShow)[]
  addToWatchList: (movie: TrendingMovie | TrendingTvShow) => void
  removeFromWatchList: (movieId: number) => void
  clearWatchList: () => void
}

export const useWatchListStore = create<WatchListState>()(
  persist(
    (set) => ({
      watchList: [],

      // Adiciona o objeto completo à lista
      addToWatchList: (movie) =>
        set((state) => {
          const isAlreadyInList = state.watchList.some((m) => m.id === movie.id)
          if (isAlreadyInList) return state

          return { watchList: [...state.watchList, movie] }
        }),

      // Filtra pelo ID do objeto
      removeFromWatchList: (movieId) =>
        set((state) => ({
          watchList: state.watchList.filter((movie) => movie.id !== movieId),
        })),

      clearWatchList: () => set({ watchList: [] }),
    }),
    {
      name: 'watchlist',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
