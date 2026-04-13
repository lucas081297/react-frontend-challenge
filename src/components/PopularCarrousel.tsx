import { MovieCarrousel } from '#/components/MovieCarrousel.tsx'
import { useState } from 'react'
import { getPopularMovies } from '#/services/tmdb/movie-lists/popular.ts'
import { getMovieGenres } from '#/services/tmdb/genres/genres.ts'
import { MovieCarrouselSkeleton } from '#/components/MovieCarrouselSkeleton.tsx'
import { useWatchListStore } from '#/store/watchList.store.ts'

export function PopularCarrousel() {
  const { addToWatchList, removeFromWatchList } = useWatchListStore()
  const { data: genresData } = getMovieGenres()

  const handleAddToWatchList = (movieId: number) => {
    if (!data) return
    const finded = data.results.find((movie) => movie.id === movieId)
    if (finded) {
      addToWatchList(finded, genresData?.genres)
    }
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
          <button className="text-on-surface-primary text-sm font-semibold hover:underline">
            Ver tudo
          </button>
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
