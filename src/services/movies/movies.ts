import { useQuery } from '@tanstack/react-query'
import type { MovieResponse } from '#/models/movie.ts'
import { toast } from 'sonner'

const API_KEY = process.env.REACT_APP_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org'

export function getTrendingMovies(page = 1) {
  return useQuery<MovieResponse>({
    queryKey: ['trending-movies', page],
    queryFn: () =>
      fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar filmes!')
        }),
  })
}
