import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getSearchMovies } from '#/services/tmdb/search/movie.ts'

const mockUseQuery = vi.fn()

vi.mock('@tanstack/react-query', () => ({
  useQuery: (config: unknown) => mockUseQuery(config),
}))

describe('getSearchMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call useQuery with correct configuration', () => {
    getSearchMovies(1, 'batman')

    expect(mockUseQuery).toHaveBeenCalled()
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['search-movies', 'batman', 1])
    expect(config.queryFn).toBeDefined()
    expect(typeof config.queryFn).toBe('function')
  })

  it('should accept different queries', () => {
    getSearchMovies(1, 'star wars')
    getSearchMovies(1, 'marvel')

    const config1 = mockUseQuery.mock.calls[0][0]
    const config2 = mockUseQuery.mock.calls[1][0]

    expect(config1.queryKey).toEqual(['search-movies', 'star wars', 1])
    expect(config2.queryKey).toEqual(['search-movies', 'marvel', 1])
  })

  it('should accept different pages', () => {
    getSearchMovies(5, 'action')
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['search-movies', 'action', 5])
  })

  it('should have enabled option', () => {
    getSearchMovies(1, 'query')
    const config = mockUseQuery.mock.calls[0][0]
    expect(config).toHaveProperty('enabled')
  })
})
