import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Badge } from '#/components/ui/badge.tsx'
import { MovieCarrousel } from '#/components/MovieCarrousel.tsx'
import { useWatchListStore } from '#/store/watchList.store.ts'
import { FilterPanel } from '#/components/FilterPanel.tsx'
import { getMovieGenres } from '#/services/tmdb/genres/genres.ts'
import type { TrendingMovie, TrendingTvShow } from '#/models/trending.ts'

export const Route = createFileRoute('/__auth/watchList')({
  component: WatchList,
})

function WatchList() {
  const { watchList, addToWatchList, removeFromWatchList } = useWatchListStore()
  const [filteredMovies, setFilteredMovies] = useState<
    (TrendingMovie | TrendingTvShow)[]
  >([])
  const { data: genresData } = getMovieGenres()

  const handleFilterChange = (filtered: (TrendingMovie | TrendingTvShow)[]) => {
    setFilteredMovies(filtered)
  }

  const moviesToDisplay =
    filteredMovies.length > 0 || watchList.length > 0
      ? filteredMovies.length > 0
        ? filteredMovies
        : watchList
      : []

  return (
    <section className="p-6">
      <div className="flex flex-col justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold">Minha Lista</h1>
            <Badge>
              {moviesToDisplay.length}{' '}
              {moviesToDisplay.length === 1 ? 'Item Salvo' : 'Itens Salvos'}
            </Badge>
          </div>
          {watchList.length > 0 && (
            <FilterPanel
              movies={watchList}
              availableGenres={genresData?.genres || []}
              onFilterChange={handleFilterChange}
              className="w-full md:w-auto"
            />
          )}
        </div>
        <div>
          {moviesToDisplay.length > 0 ? (
            <MovieCarrousel
              movies={moviesToDisplay}
              addToWatchList={addToWatchList}
              removeFromWatchList={removeFromWatchList}
              showDeleteButton={true}
            />
          ) : (
            <div className="flex items-center justify-center h-48">
              <p className="text-muted-foreground">
                {watchList.length === 0
                  ? 'Sua lista está vazia. Adicione filmes na página Explorar!'
                  : 'Nenhum resultado encontrado com os filtros selecionados.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
