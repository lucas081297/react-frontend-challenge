import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TMDBBaseUrl, ApiHeaders } from '#/services/tmdb/globals.ts'
import {
  type TrendingMovieResponse,
} from '#/models/trending.ts'
import { MovieList } from '#/models/movieLists.ts'

const path = 'movie'

export function getPopularMovies(page = 1) {
  return useQuery<TrendingMovieResponse>({
    queryKey: ['popular-movies', page],
    queryFn: () =>
      fetch(`${TMDBBaseUrl}/${path}/${MovieList.POPULAR}`, { headers: ApiHeaders })
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar filmes!')
        })
  })
}
