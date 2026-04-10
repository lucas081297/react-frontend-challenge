import { createFileRoute } from '@tanstack/react-router'
import { CardImage } from '#/components/CardImage.tsx'
import { MovieCarrousel } from '#/components/ui/MovieCarrousel.tsx'

export const Route = createFileRoute('/__auth/home')({
  component: Home,
})

export default function Home() {
  const trendingMovies = [
    {
      name: 'Spider-Man: Across the Spider-Verse',
      image:
        'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop',
      description: 'Miles Morales retorna para o próximo capítulo da saga Spider-Verse.',
    },
    {
      name: 'Dune: Part Two',
      image:
        'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=1974&auto=format&fit=crop',
      description: 'Paul Atreides se une a Chani e aos Fremen em uma guerra de vingança.',
    },
    {
      name: 'Oppenheimer',
      image:
        'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop',
      description: 'A história do físico americano J. Robert Oppenheimer e seu papel no Projeto Manhattan.',
    },
    {
      name: 'The Batman',
      image:
        'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2074&auto=format&fit=crop',
      description: 'Batman investiga a corrupção oculta em Gotham City.',
    },
    {
      name: 'Interstellar',
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      description: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço.',
    },
  ]

  const continueWatching = [
    {
      name: 'The Last of Us',
      image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop',
      description: 'Joel e Ellie atravessam um mundo pós-apocalíptico.',
    },
    {
      name: 'Succession',
      image: 'https://images.unsplash.com/photo-1542204172-3c4669f9e15f?q=80&w=1974&auto=format&fit=crop',
      description: 'A luta pelo poder dentro da família Roy.',
    },
  ]

  return (
    <main className="flex flex-col gap-12 p-8 bg-surface-variant/10 min-h-full">
      {/* Featured Movie */}
      <section className="animate-fade-in-up">
        <CardImage
          type="Main"
          name="Potato: The Movie"
          image="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"
          description="Uma aventura épica sobre a batata mais corajosa que o mundo já viu. Explore terras desconhecidas e descubra o verdadeiro significado de ser uma batata frita."
        />
      </section>

      {/* Trending */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-4">
          <h2 className="border-l-4 border-on-surface-primary pl-4 text-2xl font-bold text-white tracking-tight">
            Tendências
          </h2>
          <button className="text-on-surface-primary text-sm font-semibold hover:underline">
            Ver tudo
          </button>
        </div>
        <MovieCarrousel movies={trendingMovies} />
      </section>

      {/* Continue Watching */}
      <section className="flex flex-col gap-6 pb-12">
        <div className="flex items-center justify-between px-4">
          <h2 className="border-l-4 border-on-surface-primary pl-4 text-2xl font-bold text-white tracking-tight">
            Continuar Assistindo
          </h2>
        </div>
        <MovieCarrousel movies={continueWatching} />
      </section>
    </main>
  )
}
