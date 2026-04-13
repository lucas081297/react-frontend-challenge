import { createFileRoute } from '@tanstack/react-router'
import { Badge } from '#/components/ui/badge.tsx'
import { MovieCarrousel } from '#/components/MovieCarrousel.tsx'
import { useWatchListStore } from '#/store/watchList.store.ts'

export const Route = createFileRoute('/__auth/watchList')({
  component: WatchList,
})

function WatchList() {
  const { watchList, addToWatchList, removeFromWatchList } = useWatchListStore()

  return (
    <section className="p-6">
      <div className="flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold">Minha Lista</h1>
          <Badge>
            {watchList.length}{' '}
            {watchList.length === 1 ? 'Item Salvo' : 'Itens Salvos'}
          </Badge>
        </div>
        <div>
          <MovieCarrousel
            movies={watchList}
            addToWatchList={addToWatchList}
            removeFromWatchList={removeFromWatchList}
            showDeleteButton={true}
          />
        </div>
      </div>
    </section>
  )
}
