import { createFileRoute } from '@tanstack/react-router'
import { UpcomingMainCard } from '#/components/UpcomingMainCard.tsx'
import { TrendingCarrousel } from '#/components/TrendingCarrousel.tsx'
import { PopularCarrousel } from '#/components/PopularCarrousel.tsx'

export const Route = createFileRoute('/__auth/home')({
  component: Home,
})

export default function Home() {


  return (
    <main className="flex flex-col gap-12 p-8 bg-surface-variant/10 min-h-full">
      {/* UpComing Movie */}
      <section className="animate-fade-in-up">
        <UpcomingMainCard></UpcomingMainCard>
      </section>

      {/* Trending */}
      <TrendingCarrousel></TrendingCarrousel>

      {/* Popular */}
      <PopularCarrousel></PopularCarrousel>
    </main>
  )
}
