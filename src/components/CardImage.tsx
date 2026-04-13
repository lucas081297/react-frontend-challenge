import { Card } from '@/components/ui/card'
import { ButtonIcon } from '#/components/ButtonIcon.tsx'
import { Play, Plus, Star, Trash } from 'lucide-react'
import { PotatoStamp } from '#/components/PotatoStamp.tsx'
import { Link } from '@tanstack/react-router'
import { useWatchListStore } from '#/store/watchList.store.ts'
import type { TrendingMovie, TrendingTvShow } from '#/models/trending.ts'

interface CardImageProps {
  id: number
  average?: number
  name: string
  description: string
  image?: string
  type: 'Main' | 'Secondary'
  redirectTo?: 'People' | 'Movies'
  video?: string
  soon?: boolean
  movie?: TrendingMovie | TrendingTvShow
  addToWatchList?: (
    movie: TrendingMovie | TrendingTvShow,
    genres?: { id: number; name: string }[],
  ) => void
  removeFromWatchList?: (movieId: number) => void
}

export function CardImage(props: CardImageProps) {
  const redirect = props.redirectTo ?? 'Movies'
  const { watchList } = useWatchListStore()

  if (props.type === 'Secondary') {
    return (
      <Link
        to={redirect == 'Movies' ? '/movies/$movieId' : '/people/$personId'}
        params={
          redirect == 'Movies'
            ? { movieId: props.id.toString() }
            : { personId: props.id.toString() }
        }
      >
        <Card className="relative mx-auto w-full max-w-full py-0 border-none bg-transparent overflow-hidden group transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 z-30 aspect-video bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
          <img
            src={props.image}
            alt="Imagem"
            className="relative z-20 aspect-video w-full object-cover transition-all duration-300 group-hover:brightness-110"
          />
          {props.average && (
            <>
              <div className="absolute flex flex-row z-40 bottom-0 left-0 right-0 p-3 bg-linear-to-t font-headline font-bold text-white text-sm line-clamp-1 from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Star className="inline-block mr-2 text-yellow-300 fill-current" />
                {props.average}
              </div>
              <div className="absolute flex justify-end top-0 z-20 w-auto">
                <PotatoStamp vote={props.average}></PotatoStamp>
              </div>
            </>
          )}
        </Card>
      </Link>
    )
  }
  return (
    <Card className="relative mx-auto w-full max-w-full py-0 border-none bg-transparent overflow-hidden">
      <div className="absolute inset-0 z-30 aspect-video bg-linear-to-r from-black/80 via-black/40 to-transparent" />
      {props.soon && (
        <span className="absolute right-0 z-40 text-white/90 text-lg md:text-md mt-4 mx-3 px-4 leading-relaxed drop-shadow-md line-clamp-3 rounded-full bg-black/60">
          Em Breve...
        </span>
      )}
      <img
        src={props.image}
        alt="Popularidade"
        className="relative z-20 aspect-video w-full object-cover brightness-75"
      />
      <div className="absolute flex flex-col z-40 bottom-0 top-0 justify-center pl-10 pb-7 max-w-2xl">
        <span className="font-headline font-extrabold tracking-tighter text-on-surface-primary leading-tight text-5xl md:text-7xl drop-shadow-lg">
          {props.name}
        </span>
        <span
          style={redirect != 'People' ? { lineClamp: 3 } : {}}
          className="text-white/90 text-lg md:text-xl mt-4 leading-relaxed drop-shadow-md"
        >
          {props.description}
        </span>
        {redirect != 'People' && (
          <div className="flex flex-row gap-4 mt-8">
            <ButtonIcon
              hidden={!props.video}
              className="bg-on-surface-primary text-black hover:bg-on-surface-primary/90 border-none"
              icon={<Play fill="currentColor" />}
              label="Assistir o trailer"
              onClick={() => {
                window.open(props.video, '_blank')
              }}
            />
            {watchList.some((movie) => movie.id === props.id) ? (
              <ButtonIcon
                className="bg-surface-variant/50 backdrop-blur-md text-white border-white/20 hover:bg-surface-variant/70"
                icon={<Trash />}
                label="Minha Lista"
                onClick={() => {
                  props.removeFromWatchList?.(props.id)
                }}
              />
            ) : (
              <ButtonIcon
                className="bg-surface-variant/50 backdrop-blur-md text-white border-white/20 hover:bg-surface-variant/70"
                icon={<Plus />}
                label="Minha Lista"
                onClick={() => {
                  if (props.movie) {
                    props.addToWatchList?.(props.movie)
                  }
                }}
              />
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
