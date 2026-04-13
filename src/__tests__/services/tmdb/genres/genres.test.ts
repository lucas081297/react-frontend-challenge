import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getMovieGenres } from '#/services/tmdb/genres/genres.ts'

const mockUseQuery = vi.fn()

vi.mock('@tanstack/react-query', () => ({
  useQuery: (config: unknown) => mockUseQuery(config),
}))

describe('getMovieGenres', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call useQuery with correct configuration', () => {
    getMovieGenres()

    expect(mockUseQuery).toHaveBeenCalled()
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['movie-genres'])
    expect(config.queryFn).toBeDefined()
    expect(typeof config.queryFn).toBe('function')
  })
})
