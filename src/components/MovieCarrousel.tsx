import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '#/components/ui/carousel.tsx'
import { CardImage } from '#/components/CardImage.tsx'
import type { TrendingMovie, TrendingTvShow } from '#/models/trending.ts'
import { getPosterUrl } from '#/services/tmdb/images/images.ts'
import { formatDateFromString } from '#/utils/dateFormatter.ts'
import { PosterSize } from '#/models/tmdb.ts'
import { getMovieGenres } from '#/services/tmdb/genres/genres.ts'
import { Badge } from '#/components/ui/badge.tsx'

export interface MovieCarrouselProps {
  movies: (TrendingMovie | TrendingTvShow)[]
  addToWatchList?: (movieId: number) => void
  removeFromWatchList?: (movieId: number) => void
}

export function MovieCarrousel({
  movies,
  addToWatchList,
  removeFromWatchList,
}: MovieCarrouselProps) {
  const { data: genresData } = getMovieGenres()
  const genresMap = new Map(genresData?.genres.map((g) => [g.id, g.name]))

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-surface-variant/20 rounded-xl border border-white/5">
        <p className="text-on-surface-secundary">Nenhum filme encontrado.</p>
      </div>
    )
  }

  return (
    <div className="relative px-12">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {movies.map((movie) => {
            const title = 'title' in movie ? movie.title : movie.name
            const date =
              'release_date' in movie
                ? movie.release_date
                : movie.first_air_date

            const genreNames =
              movie.genres && movie.genres.length >= 0
                ? movie.genres.map((g) => g.name)
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                : movie.genre_ids
                    .slice(0, 2)
                    .map((id: number) => genresMap.get(id))
                    .filter((g): g is string => Boolean(g)) || []

            return (
              <CarouselItem
                key={movie.id}
                className="relative pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <CardImage
                  id={movie.id}
                  name={title}
                  redirectTo={'Movies'}
                  type="Secondary"
                  average={movie.vote_average}
                  image={getPosterUrl(movie.poster_path, PosterSize.Large)}
                  description=""
                  addToWatchList={addToWatchList}
                  removeFromWatchList={removeFromWatchList}
                />
                <div className="flex flex-col gap-1">
                  <span>{title}</span>
                  <span className="text-sm">{formatDateFromString(date)}</span>
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
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-surface-variant/50 border-none text-white hover:bg-on-surface-primary hover:text-black transition-colors" />
        <CarouselNext className="right-0 bg-surface-variant/50 border-none text-white hover:bg-on-surface-primary hover:text-black transition-colors" />
      </Carousel>
    </div>
  )
}
