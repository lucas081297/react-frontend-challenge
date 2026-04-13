import { describe, it, expect, vi } from 'vitest'
import { getSearchMovies } from '#/services/tmdb/search/movie.ts'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn((config) => ({
    data: undefined,
    isLoading: false,
    isError: false,
    ...config,
  })),
}))

describe('getSearchMovies', () => {
  it('should return query configuration', () => {
    const result = getSearchMovies(1, 'batman')
    expect(result).toBeDefined()
    expect(result.queryKey).toEqual(['search-movies', 'batman', 1])
  })

  it('should accept different queries', () => {
    const result1 = getSearchMovies(1, 'star wars')
    const result2 = getSearchMovies(1, 'marvel')
    expect(result1.queryKey).toEqual(['search-movies', 'star wars', 1])
    expect(result2.queryKey).toEqual(['search-movies', 'marvel', 1])
  })

  it('should accept different pages', () => {
    const result = getSearchMovies(5, 'action')
    expect(result.queryKey).toEqual(['search-movies', 'action', 5])
  })

  it('should have query function defined', () => {
    const result = getSearchMovies(1, 'test')
    expect(result.queryFn).toBeDefined()
    expect(typeof result.queryFn).toBe('function')
  })

  it('should have enabled option', () => {
    const result = getSearchMovies(1, 'query')
    expect(result).toHaveProperty('enabled')
  })
})
