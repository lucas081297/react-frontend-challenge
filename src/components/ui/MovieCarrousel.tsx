import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '#/components/ui/carousel.tsx'
import { CardImage } from '#/components/CardImage.tsx'

export interface MovieData {
  name: string
  image: string
  description: string
}

export interface MovieCarrouselProps {
  movies: MovieData[]
}

export function MovieCarrousel({ movies }: MovieCarrouselProps) {
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
          {movies.map((movie) => (
            <CarouselItem
              key={movie.name}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <CardImage
                type="Secondary"
                name={movie.name}
                image={movie.image}
                description={movie.description}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-surface-variant/50 border-none text-white hover:bg-on-surface-primary hover:text-black transition-colors" />
        <CarouselNext className="right-0 bg-surface-variant/50 border-none text-white hover:bg-on-surface-primary hover:text-black transition-colors" />
      </Carousel>
    </div>
  )
}
