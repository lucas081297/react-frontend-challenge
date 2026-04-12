import type { TrendingMovie } from '#/models/trending.ts'

export type Person = {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string
  deathday?: string
  gender: number
  homepage?: string
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
  credits: {
    cast: TrendingMovie[]
  }
}
