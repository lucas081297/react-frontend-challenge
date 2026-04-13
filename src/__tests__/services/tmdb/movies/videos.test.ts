import { describe, it, expect, vi } from 'vitest'
import { getVideos } from '#/services/tmdb/movies/videos.ts'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn((config) => ({
    data: undefined,
    isLoading: false,
    isError: false,
    ...config,
  })),
}))

describe('getVideos', () => {
  it('should return query configuration with movie id', () => {
    const movieId = 123
    const result = getVideos(movieId)
    expect(result).toBeDefined()
    expect(result.queryKey).toEqual(['video-url', movieId])
  })

  it('should have query function defined', () => {
    const result = getVideos(456)
    expect(result.queryFn).toBeDefined()
    expect(typeof result.queryFn).toBe('function')
  })

  it('should handle zero as movie id', () => {
    const result = getVideos(0)
    expect(result.queryKey).toEqual(['video-url', 0])
  })
})
