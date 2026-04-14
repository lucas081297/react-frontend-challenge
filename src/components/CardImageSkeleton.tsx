import { Card } from '@/components/ui/card'
import { Skeleton } from '#/components/ui/skeleton.tsx'

export function CardImageSkeleton({type}: { type: 'Main' | 'Secondary'}) {
  if (type === 'Secondary') {
    return (
      <Card className="relative mx-auto w-full max-w-full py-0 border-none bg-transparent overflow-hidden group transition-all duration-300 hover:scale-105">
        <Skeleton className="absolute inset-0 z-30 aspect-video bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
        <Skeleton
          className="relative z-20 aspect-video w-full object-cover transition-all duration-300 group-hover:brightness-110"
        />
        <Skeleton className="absolute flex flex-row z-40 bottom-0 left-0 right-0 p-3 bg-linear-to-t font-headline font-bold text-white text-sm line-clamp-1 from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        </Skeleton>
        <Skeleton className="absolute flex justify-end top-0 z-20 w-auto">
        </Skeleton>
      </Card>
    )
  }
  return (
    <Card className="relative mx-auto w-full max-w-full py-0 border-none bg-transparent overflow-hidden">
      <Skeleton className="absolute inset-0 z-30 aspect-video bg-linear-to-r from-black/80 via-black/40 to-transparent" />
      <Skeleton className="absolute right-0 z-40 text-white/90 text-lg md:text-md mt-4 mx-3 px-4 leading-relaxed drop-shadow-md line-clamp-3 rounded-full bg-black/60">
        Em Breve...
      </Skeleton>
      <Skeleton
        className="relative z-20 aspect-video w-full object-cover brightness-75"
      />
      <Skeleton className="absolute flex flex-col z-40 bottom-0 top-0 justify-center pl-10 pb-7 max-w-2xl">
        <Skeleton className="font-headline font-extrabold tracking-tighter text-on-surface-primary leading-tight text-5xl md:text-7xl drop-shadow-lg">
        </Skeleton>
        <Skeleton className="text-white/90 text-lg md:text-xl mt-4 leading-relaxed drop-shadow-md line-clamp-3">
        </Skeleton>
        <Skeleton className="flex flex-row gap-4 mt-8">
        </Skeleton>
      </Skeleton>
    </Card>
  )
}
