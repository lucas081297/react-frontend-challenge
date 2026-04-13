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
