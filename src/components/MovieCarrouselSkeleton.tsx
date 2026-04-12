import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '#/components/ui/carousel.tsx'
import type { TrendingMovie, TrendingTvShow } from '#/models/trending.ts'
import { CardImageSkeleton } from '#/components/CardImageSkeleton.tsx'
import { Skeleton } from '#/components/ui/skeleton.tsx'

export interface MovieCarrouselProps {
  movies: (TrendingMovie | TrendingTvShow)[]
}

export function MovieCarrouselSkeleton() {

  const movies = [1,2,3];

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

            return (
              <CarouselItem
                key={movie}
                className="relative pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <CardImageSkeleton
                  type="Secondary"
                />
                <Skeleton className="flex flex-col gap-1">
                </Skeleton>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
