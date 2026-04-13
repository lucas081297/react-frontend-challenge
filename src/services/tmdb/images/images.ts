import {
  TMDBImageUrl,
} from '#/services/tmdb/globals.ts'
import type { PosterSize } from '#/models/tmdb.ts'

export function getPosterUrl(path: string | undefined, posterSize: PosterSize): string | undefined {
  if (!path) return undefined
  return `${TMDBImageUrl}/${posterSize}/${path}`
}
