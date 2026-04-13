import { describe, it, expect, vi } from 'vitest'
import { getUpcomingMovies } from '#/services/tmdb/movie-lists/upcoming.ts'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn((config) => ({
    data: undefined,
    isLoading: false,
    isError: false,
    ...config,
  })),
}))

describe('getUpcomingMovies', () => {
  it('should return query configuration with default page', () => {
    const result = getUpcomingMovies()
    expect(result).toBeDefined()
    expect(result.queryKey).toEqual(['upcoming-movies', 1])
  })

  it('should return query configuration with custom page', () => {
    const result = getUpcomingMovies(3)
    expect(result.queryKey).toEqual(['upcoming-movies', 3])
  })

  it('should have query function defined', () => {
    const result = getUpcomingMovies()
    expect(result.queryFn).toBeDefined()
    expect(typeof result.queryFn).toBe('function')
  })

  it('should accept different page numbers', () => {
    const result1 = getUpcomingMovies(1)
    const result2 = getUpcomingMovies(5)
    expect(result1.queryKey).toEqual(['upcoming-movies', 1])
    expect(result2.queryKey).toEqual(['upcoming-movies', 5])
  })
})
