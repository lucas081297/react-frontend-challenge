import type { TMDBResponse } from '#/models/tmdb.ts'
import type { Genres } from '#/models/genres.ts'

export enum TrendingType {
  Movie = 'movie',
  TvShow = 'tv',
  People = 'person',
}

/** Tipo comum para todos os tipos de tendencias*/
export type TrendingBase = {
  adult: boolean
  id: number
  media_type: TrendingType
  popularity: number
}

/** Tipo comum para todos os tipos de tendencias de filmes e series*/
export type TrendingMedia = TrendingBase & {
  original_language: string
  overview: string
  poster_path: string
  genre_ids: number[]
  genres?: Genres[]
  vote_average: number
  vote_count: number
}

/** Tipo específico para as tendencias de filmes*/
export type TrendingMovie = TrendingMedia & {
  title: string
  original_title: string
  release_date: string
  video: boolean
}

export type TrendingMovieResponse = TMDBResponse<TrendingMovie[]>

/** Tipo específico para as tendencias de series*/
export type TrendingTvShow = TrendingMedia & {
  name: string
  original_name: string
  first_air_date: string
  original_country: string[]
}

export type TrendingTvShowResponse = TMDBResponse<TrendingTvShow[]>

/** Tipo específico para as tendencias de pessoas*/
export type TrendingPeople = TrendingBase & {
  name: string
  original_name: string
  gender: number
  known_for_department: string
  profile_path: string
  known_for: (TrendingMovie | TrendingTvShow)[]
}

export type TrendingPeopleResponse = TMDBResponse<TrendingPeople[]>

export type TrendingAllResponse = TMDBResponse<
  (TrendingMovie | TrendingTvShow | TrendingPeople)[]
>
