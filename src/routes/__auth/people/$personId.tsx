import { createFileRoute } from '@tanstack/react-router'
import { CardImage } from '#/components/CardImage.tsx'
import { getPosterUrl } from '#/services/tmdb/images/images.ts'
import { PosterSize } from '#/models/tmdb.ts'
import { getPersonDetails } from '#/services/tmdb/people/person.ts'

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
      <main className="my-8 px-10 flex flex-row gap-8 justify-between">
      </main>
    </>
  )
}
