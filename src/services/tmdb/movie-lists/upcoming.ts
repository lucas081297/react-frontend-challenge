import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  TMDBBaseUrl,
  ApiHeaders,
  ApiQueryLanguage,
} from '#/services/tmdb/globals.ts'
import {
  type TrendingMovieResponse,
} from '#/models/trending.ts'
import { MovieList } from '#/models/movieLists.ts'

const path = 'movie'

export function getUpcomingMovies(page = 1) {
  return useQuery<TrendingMovieResponse>({
    queryKey: ['upcoming-movies', page],
    queryFn: () =>
      fetch(`${TMDBBaseUrl}/${path}/${MovieList.UPCOMING}?${ApiQueryLanguage}`, { headers: ApiHeaders })
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar filmes!')
        })
  })
}
