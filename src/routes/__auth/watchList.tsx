import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__auth/watchList')({
  component: WatchList,
})

function WatchList() {
  return (
    <section>

    </section>
  )
}
