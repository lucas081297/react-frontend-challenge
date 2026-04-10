import {
  Card
} from '@/components/ui/card'
import { ButtonIcon } from '#/components/ButtonIcon.tsx'
import { Play, Plus } from 'lucide-react'

interface CardImageProps {
  name: string
  description: string
  image?: string
  type: 'Main' | 'Secondary'
}

export function CardImage(props: CardImageProps) {
  if (props.type === 'Secondary') {
    return (
      <Card className="relative mx-auto w-full max-w-full py-0 border-none bg-transparent overflow-hidden group transition-all duration-300 hover:scale-105">
        <div className="absolute inset-0 z-30 aspect-video bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
        <img
          src={props.image || 'https://avatar.vercel.sh/shadcn1'}
          alt={props.name}
          className="relative z-20 aspect-video w-full object-cover transition-all duration-300 group-hover:brightness-110"
        />
        <div className="absolute flex flex-col z-40 bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-headline font-bold text-white text-sm line-clamp-1">
            {props.name}
          </span>
        </div>
      </Card>
    )
  }
  return (
    <Card className="relative mx-auto w-full max-w-full py-0 border-none bg-transparent overflow-hidden">
      <div className="absolute inset-0 z-30 aspect-video bg-linear-to-r from-black/80 via-black/40 to-transparent" />
      <img
        src={props.image || 'https://avatar.vercel.sh/shadcn1'}
        alt={props.name}
        className="relative z-20 aspect-video w-full object-cover brightness-75"
      />
      <div className="absolute flex flex-col z-40 bottom-0 top-0 justify-center pl-10 pb-7 max-w-2xl">
        <span className="font-headline font-extrabold tracking-tighter text-on-surface-primary leading-tight text-5xl md:text-7xl drop-shadow-lg">
          {props.name}
        </span>
        <span className="text-white/90 text-lg md:text-xl mt-4 leading-relaxed drop-shadow-md line-clamp-3">
          {props.description}
        </span>
        <div className="flex flex-row gap-4 mt-8">
          <ButtonIcon
            className="bg-on-surface-primary text-black hover:bg-on-surface-primary/90 border-none"
            icon={<Play fill="currentColor" />}
            label="Assistir o trailer"
          />
          <ButtonIcon
            className="bg-surface-variant/50 backdrop-blur-md text-white border-white/20 hover:bg-surface-variant/70"
            icon={<Plus />}
            label="Minha Lista"
          />
        </div>
      </div>
    </Card>
  )
}
