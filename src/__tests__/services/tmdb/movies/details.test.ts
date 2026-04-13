import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getMovieDetails } from '#/services/tmdb/movies/details.ts'

const mockUseQuery = vi.fn()

vi.mock('@tanstack/react-query', () => ({
  useQuery: (config: unknown) => mockUseQuery(config),
}))

describe('getMovieDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call useQuery with correct configuration', () => {
    const movieId = 123
    getMovieDetails(movieId)

    expect(mockUseQuery).toHaveBeenCalled()
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['video-url', movieId])
    expect(config.queryFn).toBeDefined()
    expect(typeof config.queryFn).toBe('function')
  })

  it('should pass different movie ids to queryKey', () => {
    getMovieDetails(1)
    const config1 = mockUseQuery.mock.calls[0][0]
    expect(config1.queryKey).toEqual(['video-url', 1])

    getMovieDetails(999999)
    const config2 = mockUseQuery.mock.calls[1][0]
    expect(config2.queryKey).toEqual(['video-url', 999999])
  })

  it('should return result from useQuery', () => {
    const mockResult = { data: null, isLoading: true }
    mockUseQuery.mockReturnValue(mockResult)

    const result = getMovieDetails(456)
    expect(result).toBe(mockResult)
  })
})
