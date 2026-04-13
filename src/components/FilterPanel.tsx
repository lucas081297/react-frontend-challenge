import { useState, useMemo } from 'react'
import { Button } from '#/components/ui/button.tsx'
import { Badge } from '#/components/ui/badge.tsx'
import { Input } from '#/components/ui/input.tsx'
import { Filter, X, Calendar, Star } from 'lucide-react'
import type { TrendingMovie, TrendingTvShow } from '#/models/trending.ts'

interface FilterPanelProps {
  movies: (TrendingMovie | TrendingTvShow)[]
  availableGenres: { id: number; name: string }[]
  onFilterChange: (filteredMovies: (TrendingMovie | TrendingTvShow)[]) => void
  className?: string
}

export function FilterPanel({
  movies,
  availableGenres,
  onFilterChange,
  className = '',
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [minYear, setMinYear] = useState<string>('')
  const [maxYear, setMaxYear] = useState<string>('')
  const [minRating, setMinRating] = useState<string>('')

  const hasActiveFilters =
    selectedGenres.length > 0 || minYear || maxYear || minRating

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      // Filtrar por gênero
      if (selectedGenres.length > 0) {
        const movieGenres = movie.genre_ids
        const hasAnyGenre = selectedGenres.some((genreId) =>
          movieGenres.includes(genreId),
        )
        if (!hasAnyGenre) return false
      }

      // Filtrar por ano de lançamento
      const releaseDate =
        'release_date' in movie
          ? movie.release_date
          : 'first_air_date' in movie
            ? movie.first_air_date
            : null

      if (releaseDate) {
        const year = new Date(releaseDate).getFullYear()

        if (minYear && year < parseInt(minYear)) return false
        if (maxYear && year > parseInt(maxYear)) return false
      }

      // Filtrar por nota mínima
      if (minRating && movie.vote_average < parseFloat(minRating)) {
        return false
      }

      return true
    })
  }, [movies, selectedGenres, minYear, maxYear, minRating])

  useMemo(() => {
    onFilterChange(filteredMovies)
  }, [filteredMovies, onFilterChange])

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId],
    )
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setMinYear('')
    setMaxYear('')
    setMinRating('')
  }

  const currentYear = new Date().getFullYear()

  return (
    <div className={`flex flex-col gap-4 ${className}`}>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          <Filter size={16} />
          Filtros
          {hasActiveFilters && (
            <Badge variant="default" className="ml-1">
              {selectedGenres.length +
                (minYear ? 1 : 0) +
                (maxYear ? 1 : 0) +
                (minRating ? 1 : 0)}
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-destructive hover:text-destructive/80 gap-1"
          >
            <X size={14} />
            Limpar
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="bg-surface-variant/10 rounded-lg p-4 space-y-4 border border-border">
          {/* Filtro de Gêneros */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Gêneros</h3>
            <div className="flex flex-wrap gap-2">
              {availableGenres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => toggleGenre(genre.id)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium transition-all
                    ${
                      selectedGenres.includes(genre.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }
                  `}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro de Ano */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar size={14} />
              Ano de Lançamento
            </h3>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="De"
                min={1900}
                max={currentYear}
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
                className="w-24"
              />
              <span className="text-muted-foreground">até</span>
              <Input
                type="number"
                placeholder="Até"
                min={1900}
                max={currentYear}
                value={maxYear}
                onChange={(e) => setMaxYear(e.target.value)}
                className="w-24"
              />
            </div>
          </div>

          {/* Filtro de Nota */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Star size={14} />
              Nota Mínima
            </h3>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                placeholder="0"
                min={0}
                max={10}
                step={0.1}
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-20"
              />
              <div className="flex-1">
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={minRating || 0}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
              <span className="text-sm font-medium min-w-[3rem] text-right">
                {minRating || 0}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Mostrando <strong>{filteredMovies.length}</strong> de{' '}
              <strong>{movies.length}</strong> resultados
            </p>
          </div>
        </div>
      )}

      {!isExpanded && hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtros:</span>
          {selectedGenres.map((genreId) => {
            const genre = availableGenres.find((g) => g.id === genreId)
            return genre ? (
              <Badge key={genreId} variant="secondary" className="gap-1">
                {genre.name}
                <button
                  onClick={() => toggleGenre(genreId)}
                  className="hover:text-destructive"
                >
                  <X size={12} />
                </button>
              </Badge>
            ) : null
          })}
          {minYear && (
            <Badge variant="secondary" className="gap-1">
              De {minYear}
              <button
                onClick={() => setMinYear('')}
                className="hover:text-destructive"
              >
                <X size={12} />
              </button>
            </Badge>
          )}
          {maxYear && (
            <Badge variant="secondary" className="gap-1">
              Até {maxYear}
              <button
                onClick={() => setMaxYear('')}
                className="hover:text-destructive"
              >
                <X size={12} />
              </button>
            </Badge>
          )}
          {minRating && (
            <Badge variant="secondary" className="gap-1">
              ≥ {minRating}★
              <button
                onClick={() => setMinRating('')}
                className="hover:text-destructive"
              >
                <X size={12} />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
