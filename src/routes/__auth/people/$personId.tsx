import { createFileRoute } from '@tanstack/react-router'
import { CardImage } from '#/components/CardImage.tsx'
import { getPosterUrl } from '#/services/tmdb/images/images.ts'
import { PosterSize } from '#/models/tmdb.ts'
import { getPersonDetails } from '#/services/tmdb/people/person.ts'
import { MovieCarrousel } from '#/components/MovieCarrousel.tsx'

export const Route = createFileRoute('/__auth/people/$personId')({
  component: PersonInfo,
})

function PersonInfo() {
  const { personId } = Route.useParams()

  const { data, isLoading, isError } = getPersonDetails(+personId)
  const person = data

  if (isLoading) return <div>Carregando...</div>

  if (isError || !person) return <div>Erro ao carregar filme</div>

  return (
    <>
      <CardImage
        id={person.id}
        name={person.name}
        redirectTo={'People'}
        type="Main"
        image={getPosterUrl(person.profile_path, PosterSize.Original)}
        description={person.biography}
        soon={false}
      ></CardImage>
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-4">
            <h2 className="border-l-4 border-on-surface-primary pl-4 text-2xl font-bold text-white tracking-tight">
              Popular
            </h2>
            <button className="text-on-surface-primary text-sm font-semibold hover:underline">
              Ver tudo
            </button>
          </div>
          <MovieCarrousel movies={person.credits.cast} />
        </section>
    </>
  )
}
