import { describe, it, expect, vi } from 'vitest'
import { getMovieGenres } from '#/services/tmdb/genres/genres.ts'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn((config) => ({
    data: undefined,
    isLoading: false,
    isError: false,
    ...config,
  })),
}))

describe('getMovieGenres', () => {
  it('should return query configuration', () => {
    const result = getMovieGenres()
    expect(result).toBeDefined()
    expect(result.queryKey).toEqual(['movie-genres'])
  })

  it('should have query function defined', () => {
    const result = getMovieGenres()
    expect(result.queryFn).toBeDefined()
    expect(typeof result.queryFn).toBe('function')
  })
})
