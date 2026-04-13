import { MovieCarrousel } from '#/components/MovieCarrousel.tsx'
import { useState } from 'react'
import { getPopularMovies } from '#/services/tmdb/movie-lists/popular.ts'
import { getMovieGenres } from '#/services/tmdb/genres/genres.ts'
import { MovieCarrouselSkeleton } from '#/components/MovieCarrouselSkeleton.tsx'
import { useWatchListStore } from '#/store/watchList.store.ts'
import { Link } from '@tanstack/react-router'
import type { TrendingMovie, TrendingTvShow } from '#/models/trending.ts'

export function PopularCarrousel() {
  const { addToWatchList, removeFromWatchList } = useWatchListStore()
  const { data: genresData } = getMovieGenres()

  const handleAddToWatchList = (movie: TrendingMovie | TrendingTvShow) => {
    addToWatchList(movie, genresData?.genres)
  }

  const handleRemoveFromWatchList = (movieId: number) => {
    removeFromWatchList(movieId)
  }

  const [page] = useState(1)

  const { data, isLoading, isError } = getPopularMovies(page)

  if (isLoading) {
    return <MovieCarrouselSkeleton></MovieCarrouselSkeleton>
  }

  if (isError || !data) {
    return <div>Erro ao carregar filmes</div>
  }

  return (
    <>
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-4">
          <h2 className="border-l-4 border-on-surface-primary pl-4 text-2xl font-bold text-white tracking-tight">
            Popular
          </h2>
          <Link
            to="/movies/popular"
            className="text-on-surface-primary text-sm font-semibold hover:underline"
          >
            Ver tudo
          </Link>
        </div>
        <MovieCarrousel
          movies={data.results}
          addToWatchList={handleAddToWatchList}
          removeFromWatchList={handleRemoveFromWatchList}
        />
      </section>
    </>
  )
}
