import { describe, it, expect, vi } from 'vitest'
import { getPopularMovies } from '#/services/tmdb/movie-lists/popular.ts'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn((config) => ({
    data: undefined,
    isLoading: false,
    isError: false,
    ...config,
  })),
}))

describe('getPopularMovies', () => {
  it('should return query configuration with default page', () => {
    const result = getPopularMovies()
    expect(result).toBeDefined()
    expect(result.queryKey).toEqual(['popular-movies', 1])
  })

  it('should return query configuration with custom page', () => {
    const result = getPopularMovies(5)
    expect(result.queryKey).toEqual(['popular-movies', 5])
  })

  it('should have query function defined', () => {
    const result = getPopularMovies()
    expect(result.queryFn).toBeDefined()
    expect(typeof result.queryFn).toBe('function')
  })

  it('should accept different page numbers', () => {
    const result1 = getPopularMovies(1)
    const result2 = getPopularMovies(10)
    const result3 = getPopularMovies(100)
    expect(result1.queryKey).toEqual(['popular-movies', 1])
    expect(result2.queryKey).toEqual(['popular-movies', 10])
    expect(result3.queryKey).toEqual(['popular-movies', 100])
  })
})
