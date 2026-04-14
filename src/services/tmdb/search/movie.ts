import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  TMDBBaseUrl,
  ApiHeaders,
  ApiQueryLanguage,
} from '#/services/tmdb/globals.ts'
import { type TrendingMovieResponse, TrendingType } from '#/models/trending.ts'

const path = 'search'

export function getSearchMovies(page = 1, query: string) {
  return useQuery<TrendingMovieResponse>({
    queryKey: ['search-movies', query, page],
    queryFn: () =>
      fetch(
        `${TMDBBaseUrl}/${path}/${TrendingType.Movie}?${ApiQueryLanguage}&query=${query}&include_adult=false&page=${page}`,
        {
          headers: ApiHeaders,
        },
      )
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar filmes!')
        }),
    enabled: !!query && query.length > 0,
  })
}
