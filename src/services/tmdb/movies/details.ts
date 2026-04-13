import {
  ApiHeaders,
  ApiQueryLanguage,
  TMDBBaseUrl,
} from '#/services/tmdb/globals.ts'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { MovieDetails } from '#/models/movieDetails.ts'

const path = 'movie'

export function getMovieDetails(id: number) {
  return useQuery<MovieDetails>({
    queryKey: ['video-url', id],
    queryFn: () =>
      fetch(
        `${TMDBBaseUrl}/${path}/${id}?${ApiQueryLanguage}&append_to_response=videos,credits`,
        { headers: ApiHeaders },
      )
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar o video!')
        }),
  })
}
