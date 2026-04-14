import type { TrendingMovie, TrendingPeople } from '#/models/trending.ts'
import type { Genres } from '#/models/genres.ts'
import type { Video } from '#/models/video.ts'

export type MovieDetails = Partial<TrendingMovie> & {
  belongs_to_collection: null | {
    name: string
  }
  genres: Genres[]
  budget: number
  homepage: string
  imdb_id: string
  original_country: string[]
  production_companies: {
    name: string
  }[]
  production_countries: {
    name: string,
    iso_3166_1: string
  }[]
  revenue: number
  runtime: number
  spoken_languages: {
    name: string,
    english_name: string,
    iso_639_1: string
  }[]
  status: string
  tagline: string

  videos?: {
    results: Video[]
  }
  credits?: {
    cast: Partial<TrendingPeople & {character: string}>[]
  }
};
