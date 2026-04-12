import {
  TMDBImageUrl,
} from '#/services/tmdb/globals.ts'
import type { PosterSize } from '#/models/tmdb.ts'

export function getPosterUrl(path: string, posterSize: PosterSize) {
  return `${TMDBImageUrl}/${posterSize}/${path}`
}
