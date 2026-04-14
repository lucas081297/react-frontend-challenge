import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Input } from '#/components/ui/input.tsx'
import { Badge } from '#/components/ui/badge.tsx'
import { getPosterUrl } from '#/services/tmdb/images/images.ts'
import { formatDateFromString } from '#/utils/dateFormatter.ts'
import { PosterSize } from '#/models/tmdb.ts'
import { getSearchMovies } from '#/services/tmdb/search/movie.ts'
import { useWatchListStore } from '#/store/watchList.store.ts'
import { getMovieGenres } from '#/services/tmdb/genres/genres.ts'
import { Star, Trash2, Plus } from 'lucide-react'
import type { TrendingMovie, TrendingTvShow } from '#/models/trending.ts'
import { FilterPanel } from '#/components/FilterPanel.tsx'

export const Route = createFileRoute('/__auth/explore')({
  component: Explore,
})

function Explore() {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [page, setPage] = useState(1)
  const [allMovies, setAllMovies] = useState<
    (TrendingMovie | TrendingTvShow)[]
  >([])
  const [filteredMovies, setFilteredMovies] = useState<
    (TrendingMovie | TrendingTvShow)[]
  >([])
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const { addToWatchList, removeFromWatchList, watchList } = useWatchListStore()
  const { data: genresData } = getMovieGenres()

  const { data, isLoading, isFetching } = getSearchMovies(page, debouncedQuery)

  useEffect(() => {
    if (data?.results) {
      if (page === 1) {
        setAllMovies(data.results)
      } else {
        setAllMovies((prev) => [...prev, ...data.results])
      }
      setHasMore(page < data.total_pages)
    }
  }, [data, page])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setPage(1)
      setAllMovies([])
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetching) return

      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1)
        }
      })

      if (node) {
        observerRef.current.observe(node)
      }
    },
    [isLoading, isFetching, hasMore],
  )

  const genresMap = new Map(genresData?.genres.map((g) => [g.id, g.name]))

  const handleAddToWatchList = (movie: TrendingMovie | TrendingTvShow) => {
    addToWatchList(movie, genresData?.genres)
  }

  const handleRemoveFromWatchList = (movieId: number) => {
    removeFromWatchList(movieId)
  }

  const isInWatchList = (movieId: number) => {
    return watchList.some((m) => m.id === movieId)
  }

  const handleFilterChange = (filtered: (TrendingMovie | TrendingTvShow)[]) => {
    setFilteredMovies(filtered)
  }

  const moviesToDisplay =
    filteredMovies.length > 0 || allMovies.length > 0
      ? filteredMovies.length > 0
        ? filteredMovies
        : allMovies
      : []

  return (
    <main className="flex flex-col gap-8 p-8 bg-surface-variant/10 min-h-full">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-[var(--text-primary)]">
          Explorar Filmes
        </h1>

        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="max-w-xl flex-1">
            <Input
              type="text"
              placeholder="Buscar filmes..."
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          {allMovies.length > 0 && (
            <FilterPanel
              movies={allMovies}
              availableGenres={genresData?.genres || []}
              onFilterChange={handleFilterChange}
              className="w-full md:w-auto"
            />
          )}
        </div>
      </div>

      {isLoading && page === 1 && (
        <div className="flex items-center justify-center h-48">
          <p className="text-[var(--text-muted)]">Carregando...</p>
        </div>
      )}

      {!debouncedQuery && !isLoading && (
        <div className="flex items-center justify-center h-48">
          <p className="text-[var(--text-muted)]">
            Digite algo para buscar filmes
          </p>
        </div>
      )}

      {data?.results.length === 0 && debouncedQuery && !isLoading && (
        <div className="flex items-center justify-center h-48">
          <p className="text-[var(--text-muted)]">
            Nenhum filme encontrado para &quot;{debouncedQuery}&quot;
          </p>
        </div>
      )}

      {moviesToDisplay.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {moviesToDisplay.map((movie, index) => {
            const title = 'title' in movie ? movie.title : movie.name
            const date =
              'release_date' in movie
                ? movie.release_date
                : movie.first_air_date

            const genreNames =
              movie.genre_ids
                ?.slice(0, 2)
                .map((id: number) => genresMap.get(id))
                .filter((g): g is string => Boolean(g)) || []

            const isLast = index === moviesToDisplay.length - 1
            const inWatchList = isInWatchList(movie.id)

            return (
              <div
                key={movie.id}
                ref={isLast ? lastMovieRef : null}
                className="flex flex-col gap-2 group"
              >
                <Link
                  to="/movies/$movieId"
                  params={{ movieId: movie.id.toString() }}
                  className="relative aspect-[2/3] overflow-hidden rounded-lg bg-surface-variant"
                >
                  <img
                    src={getPosterUrl(movie.poster_path, PosterSize.Large)}
                    alt={title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full text-xs text-white">
                      <Star
                        size={12}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </Link>

                <div className="flex flex-col gap-1">
                  <Link
                    to="/movies/$movieId"
                    params={{ movieId: movie.id.toString() }}
                    className="font-medium line-clamp-1 text-[var(--text-primary)] hover:text-[var(--primary-color)] transition-colors"
                  >
                    {title}
                  </Link>
                  <span className="text-sm text-[var(--text-muted)]">
                    {formatDateFromString(date)}
                  </span>

                  {genreNames.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {genreNames.map((genre, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-2">
                    {inWatchList ? (
                      <button
                        onClick={() => handleRemoveFromWatchList(movie.id)}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={14} />
                        Remover
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToWatchList(movie)}
                        className="flex items-center gap-1 text-xs text-[var(--primary-color)] hover:text-[var(--primary-hover)] transition-colors"
                      >
                        <Plus size={14} />
                        Adicionar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {isFetching && page > 1 && (
        <div className="flex items-center justify-center py-8">
          <p className="text-on-surface-secundary">Carregando mais...</p>
        </div>
      )}

      {!hasMore && allMovies.length > 0 && (
        <div className="flex items-center justify-center py-8">
          <p className="text-on-surface-secundary">Fim dos resultados</p>
        </div>
      )}
    </main>
  )
}
