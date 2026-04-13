import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getUpcomingMovies } from '#/services/tmdb/movie-lists/upcoming.ts'

const mockUseQuery = vi.fn()

vi.mock('@tanstack/react-query', () => ({
  useQuery: (config: unknown) => mockUseQuery(config),
}))

describe('getUpcomingMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call useQuery with default page', () => {
    getUpcomingMovies()

    expect(mockUseQuery).toHaveBeenCalled()
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['upcoming-movies', 1])
    expect(config.queryFn).toBeDefined()
    expect(typeof config.queryFn).toBe('function')
  })

  it('should call useQuery with custom page', () => {
    getUpcomingMovies(3)
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['upcoming-movies', 3])
  })

  it('should accept different page numbers', () => {
    getUpcomingMovies(1)
    getUpcomingMovies(5)

    const config1 = mockUseQuery.mock.calls[0][0]
    const config2 = mockUseQuery.mock.calls[1][0]

    expect(config1.queryKey).toEqual(['upcoming-movies', 1])
    expect(config2.queryKey).toEqual(['upcoming-movies', 5])
  })
})
