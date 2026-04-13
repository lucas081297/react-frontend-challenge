import { describe, it, expect, vi } from 'vitest'
import { getMovieDetails } from '#/services/tmdb/movies/details.ts'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn((config) => ({
    data: undefined,
    isLoading: false,
    isError: false,
    ...config,
  })),
}))

describe('getMovieDetails', () => {
  it('should return query configuration with movie id', () => {
    const movieId = 123
    const result = getMovieDetails(movieId)
    expect(result).toBeDefined()
    expect(result.queryKey).toEqual(['video-url', movieId])
  })

  it('should have query function defined', () => {
    const result = getMovieDetails(456)
    expect(result.queryFn).toBeDefined()
    expect(typeof result.queryFn).toBe('function')
  })

  it('should accept different movie ids', () => {
    const result1 = getMovieDetails(1)
    const result2 = getMovieDetails(999999)
    expect(result1.queryKey).toEqual(['video-url', 1])
    expect(result2.queryKey).toEqual(['video-url', 999999])
  })
})
