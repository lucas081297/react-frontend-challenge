import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { MovieGenresResponse } from '#/models/genres.ts'
import { TMDBBaseUrl, ApiHeaders } from '#/services/tmdb/globals.ts'

const path = '/genre'

export function getMovieGenres() {
  return useQuery<MovieGenresResponse>({
    queryKey: ['movie-genres'],
    queryFn: () =>
      fetch(`${TMDBBaseUrl}/${path}/movie/list`, { headers: ApiHeaders })
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar filmes!')
        }),
  })
}

export function getTvShowGenres() {
  return useQuery<MovieGenresResponse>({
    queryKey: ['tv-shows-genres'],
    queryFn: () =>
      fetch(`${TMDBBaseUrl}/${path}/tv/list`, { headers: ApiHeaders })
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar series!')
        }),
  })
}
