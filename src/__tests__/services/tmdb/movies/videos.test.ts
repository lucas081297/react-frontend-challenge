import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getVideos } from '#/services/tmdb/movies/videos.ts'

const mockUseQuery = vi.fn()

vi.mock('@tanstack/react-query', () => ({
  useQuery: (config: unknown) => mockUseQuery(config),
}))

describe('getVideos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call useQuery with correct configuration', () => {
    const movieId = 123
    getVideos(movieId)

    expect(mockUseQuery).toHaveBeenCalled()
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['video-url', movieId])
    expect(config.queryFn).toBeDefined()
    expect(typeof config.queryFn).toBe('function')
  })

  it('should pass different movie ids to queryKey', () => {
    getVideos(1)
    const config1 = mockUseQuery.mock.calls[0][0]
    expect(config1.queryKey).toEqual(['video-url', 1])

    getVideos(999)
    const config2 = mockUseQuery.mock.calls[1][0]
    expect(config2.queryKey).toEqual(['video-url', 999])
  })

  it('should handle zero as movie id', () => {
    getVideos(0)
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['video-url', 0])
  })
})
