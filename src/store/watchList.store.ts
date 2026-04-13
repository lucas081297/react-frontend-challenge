import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TrendingMovie, TrendingTvShow } from '#/models/trending.ts'

export interface WatchListState {
  watchList: (TrendingMovie | TrendingTvShow)[]
  addToWatchList: (
    movie: TrendingMovie | TrendingTvShow,
    genres?: { id: number; name: string }[],
  ) => void
  removeFromWatchList: (movieId: number) => void
  clearWatchList: () => void
}

export const useWatchListStore = create<WatchListState>()(
  persist(
    (set) => ({
      watchList: [],

      // Adiciona o objeto completo à lista com os nomes dos gêneros
      addToWatchList: (movie, genres) =>
        set((state) => {
          const isAlreadyInList = state.watchList.some((m) => m.id === movie.id)
          if (isAlreadyInList) return state

          // Se tiver gêneros, adiciona os nomes ao filme
          const movieWithGenres = genres
            ? {
                ...movie,
                genres_names: movie.genres_ids
                  ?.map((id) => genres.find((g) => g.id === id)?.name)
                  .filter(Boolean),
              }
            : movie

          return { watchList: [...state.watchList, movieWithGenres] }
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
