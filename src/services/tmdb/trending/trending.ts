import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TMDBBaseUrl, ApiHeaders } from '#/services/tmdb/globals.ts'
import {
  type TrendingMovieResponse,
  type TrendingPeopleResponse,
  type TrendingTvShowResponse,
  TrendingType,
} from '#/models/trending.ts'
import type { TimeWindow } from '#/models/timeWindow.ts'

const path = 'trending'

export function getTrendingMovies(page = 1, timeWindow: TimeWindow) {
  return useQuery<TrendingMovieResponse>({
    queryKey: ['trending-movies', page],
    queryFn: () =>
      fetch(`${TMDBBaseUrl}/${path}/${TrendingType.Movie}/${timeWindow}`, { headers: ApiHeaders })
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar filmes!')
        })
  })
}

export function getTrendingTvShows(page = 1, timeWindow: TimeWindow) {
  return useQuery<TrendingTvShowResponse>({
    queryKey: ['trending-tv-shows', page],
    queryFn: () =>
      fetch(`${TMDBBaseUrl}/${path}/${TrendingType.TvShow}/${timeWindow}`, { headers: ApiHeaders })
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar series!')
        })
  })
}

export function getTrendingPeople(page = 1, timeWindow: TimeWindow) {
  return useQuery<TrendingPeopleResponse>({
    queryKey: ['trending-people', page],
    queryFn: () =>
      fetch(`${TMDBBaseUrl}/${path}/${TrendingType.TvShow}/${timeWindow}`, {
        headers: ApiHeaders,
      })
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar atores!')
        }),
  })
}
