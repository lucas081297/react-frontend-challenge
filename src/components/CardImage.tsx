import {
  Card
} from '@/components/ui/card'
import { ButtonIcon } from '#/components/ButtonIcon.tsx'
import { Play, Plus } from 'lucide-react'

interface CardImageProps {
  name: string
  description: string;
  type: 'Main' | 'Secondary'
}

export function CardImage(props: CardImageProps) {
  if(props.type === 'Secondary') {
    return(
      <Card className="relative mx-auto w-full max-w-full py-0"></Card>
    )
  }
  return (
    <Card className="relative mx-auto w-full max-w-full py-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <div className="absolute flex flex-col z-40 bottom-0 pl-5 pb-7">
        <span className="font-headline font-extrabold tracking-tighter text-white leading-tight text-5xl md:text-7xl">
          {props.name}
        </span>
        <span className="text-on-surface-secundary text-lg md:text-xl max-w-2xl leading-relaxed">
          {props.description}
        </span>
        <div className="flex flex-row gap-4 mt-5">
          <ButtonIcon icon={<Play />} label="Assistir o trailer" />
          <ButtonIcon icon={<Plus />} label="Adicionar à Minha Lista" />
        </div>
      </div>
    </Card>
  )
}
