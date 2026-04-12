import type { TrendingMovie } from '#/models/trending.ts'

export interface WatchListState {
  watchList: TrendingMovie[]
  addToWatchList: (movieId: number) => void
  removeFromWatchList: (movieId: number) => void
  clearWatchList: () => void
}
