// O objeto do filme que vem do TMDB
import type { TMDBResponse } from '#/models/tmdb.ts'

export interface Movie {
  id: number
  title: string
  poster_path: string
  overview: string
  vote_average: number
  release_date: string
}

export type MovieResponse = TMDBResponse<Movie>
