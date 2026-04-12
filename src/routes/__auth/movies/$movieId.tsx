import { createFileRoute } from '@tanstack/react-router'
import { getMovieDetails } from '#/services/tmdb/movies/details.ts'
import { CardImage } from '#/components/CardImage.tsx'
import { getPosterUrl } from '#/services/tmdb/images/images.ts'
import { getYouTubeUrl } from '#/utils/youtube.ts'
import { PosterSize } from '#/models/tmdb.ts'
import { formatTimeFromMinutes } from '#/utils/timeFormatter.ts'
import { PotatoStamp } from '#/components/PotatoStamp.tsx'
import { Star } from 'lucide-react'
import { formatDateFromString } from '#/utils/dateFormatter.ts'
import { formatMoneyToMillion } from '#/utils/moneyFormatter.ts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '#/components/ui/carousel.tsx'

export const Route = createFileRoute('/__auth/movies/$movieId')({
  component: MovieInfo,
})

function MovieInfo() {
  const { movieId } = Route.useParams()

  const { data: movieResponse, isLoading, isError } = getMovieDetails(+movieId)
  const movie = movieResponse

  if (isLoading) return <div>Carregando...</div>

  if (isError || !movie) return <div>Erro ao carregar filme</div>

  const validVideo = movie.videos?.results.filter(
    (video) =>
      video.site === 'YouTube' && video.type === 'Trailer' && video.official,
  )[0]

  const validUrl = getYouTubeUrl(validVideo?.key)

  return (
    <>
      <CardImage
        id={movie.id ?? 0}
        name={movie.title ?? ''}
        type="Main"
        image={getPosterUrl(movie.poster_path ?? '', PosterSize.Original)}
        description=""
        video={validUrl}
        soon={false}
      ></CardImage>
      <main className="my-8 px-10 flex flex-row gap-8 justify-between">
        <section className="flex flex-col w-[65%] gap-10">
          <div className="flex flex-row gap-7 items-start py-3 px-2 rounded-2xl bg-surface-variant/20">
            <div className="flex flex-col text-nowrap">
              <span className="text-xs uppercase text-amber-600">
                Classificação
              </span>
              <span className="font-extrabold flex gap-1">
                <Star className="fill-amber-300" />
                {movie.vote_average}
              </span>
            </div>

            <div className="flex flex-col text-nowrap">
              <span className="text-xs uppercase text-amber-600">Duração</span>
              <span className="font-extrabold">
                {formatTimeFromMinutes(movie.runtime)}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs uppercase text-amber-600">Generos</span>
              <div className="flex flex-wrap gap-1 font-extrabold">
                {movie.genres.map((genre, index: number) => {
                  return (
                    <div className="block whitespace-nowrap" key={genre.id}>
                      <span className="text-nowrap">{genre.name}</span>
                      {movie.genres.length > index + 1 && (
                        <span className="mr-1">,</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Sinopse</h1>
            <article>{movie.overview}</article>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Atores</h1>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {movie.credits?.cast.map((c) => {

                  return (
                    <CarouselItem
                      key={movie.id}
                      className="relative pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <CardImage
                        id={c.id ?? 0}
                        name={c.name ?? ''}
                        redirectTo={'People'}
                        type="Secondary"
                        image={getPosterUrl(
                          c.profile_path,
                          PosterSize.Large,
                        )}
                        description=""
                      />
                      <div className="flex flex-col gap-1">
                        <span>{c.name}</span>
                        <span className="text-sm">
                          {c.character}
                        </span>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-surface-variant/50 border-none text-white hover:bg-on-surface-primary hover:text-black transition-colors" />
              <CarouselNext className="right-0 bg-surface-variant/50 border-none text-white hover:bg-on-surface-primary hover:text-black transition-colors" />
            </Carousel>
          </div>
        </section>

        <section>
          <div className="relative pt-5">
            <div className="flex flex-col gap-2 rounded-2xl p-4 mt-4 text-sm bg-surface-variant/80">
              <h2 className="text-md font-bold mb-2">Informações</h2>
              <div className="flex flex-row gap-2 text-xs">
                <span className="text-on-surface-secundary">Diretor</span>
                <span>Diretor</span>
              </div>

              <div className="flex flex-row gap-2 text-xs">
                <span className="text-nowrap text-on-surface-secundary">
                  Lançamento
                </span>
                <span>{formatDateFromString(movie.release_date ?? '')}</span>
              </div>

              <div className="flex flex-row gap-2 text-xs">
                <span className="text-nowrap text-on-surface-secundary">
                  Orçamento
                </span>
                <span>{formatMoneyToMillion(movie.budget)}</span>
              </div>

              <div className="flex flex-row gap-2 text-xs">
                <span className="text-nowrap text-on-surface-secundary">
                  Receita
                </span>
                <span>{formatMoneyToMillion(movie.revenue)}</span>
              </div>
            </div>
            <div className="absolute top-0 right- flex justify-end pe-2 ">
              <PotatoStamp
                vote={movie.vote_average ?? 0}
                size={45}
              ></PotatoStamp>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
