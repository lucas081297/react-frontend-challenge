import {
  ApiHeaders,
  ApiQueryLanguage,
  TMDBBaseUrl,
} from '#/services/tmdb/globals.ts'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Person } from '#/models/person.ts'

const path = 'person'

export function getPersonDetails(id: number) {
  return useQuery<Person>({
    queryKey: ['person', id],
    queryFn: () =>
      fetch(
        `${TMDBBaseUrl}/${path}/${id}?${ApiQueryLanguage}&append_to_response=credits`,
        { headers: ApiHeaders },
      )
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar as informações do ator!')
        }),
  })
}
