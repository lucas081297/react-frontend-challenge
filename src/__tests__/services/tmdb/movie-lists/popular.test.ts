import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getPopularMovies } from '#/services/tmdb/movie-lists/popular.ts'

const mockUseQuery = vi.fn()

vi.mock('@tanstack/react-query', () => ({
  useQuery: (config: unknown) => mockUseQuery(config),
}))

describe('getPopularMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call useQuery with default page', () => {
    getPopularMovies()

    expect(mockUseQuery).toHaveBeenCalled()
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['popular-movies', 1])
    expect(config.queryFn).toBeDefined()
    expect(typeof config.queryFn).toBe('function')
  })

  it('should call useQuery with custom page', () => {
    getPopularMovies(5)
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['popular-movies', 5])
  })

  it('should accept different page numbers', () => {
    getPopularMovies(1)
    getPopularMovies(10)
    getPopularMovies(100)

    const config1 = mockUseQuery.mock.calls[0][0]
    const config2 = mockUseQuery.mock.calls[1][0]
    const config3 = mockUseQuery.mock.calls[2][0]

    expect(config1.queryKey).toEqual(['popular-movies', 1])
    expect(config2.queryKey).toEqual(['popular-movies', 10])
    expect(config3.queryKey).toEqual(['popular-movies', 100])
  })
})
