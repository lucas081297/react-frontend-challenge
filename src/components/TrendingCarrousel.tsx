import { MovieCarrousel } from '#/components/MovieCarrousel.tsx'
import { getTrendingMovies } from '#/services/tmdb/trending/trending.ts'
import { TimeWindow } from '#/models/timeWindow.ts'
import { useState } from 'react'
import { MovieCarrouselSkeleton } from '#/components/MovieCarrouselSkeleton.tsx'

export function TrendingCarrousel() {
  const [page] = useState(1)

  const { data, isLoading, isError } = getTrendingMovies(page, TimeWindow.Day)

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
            Tendências
          </h2>
          <button className="text-on-surface-primary text-sm font-semibold hover:underline">
            Ver tudo
          </button>
        </div>
        <MovieCarrousel movies={data.results} />
      </section>
    </>
  )
}
