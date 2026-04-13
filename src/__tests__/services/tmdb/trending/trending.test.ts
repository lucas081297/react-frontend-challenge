import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getTrendingMovies,
  getTrendingTvShows,
  getTrendingPeople,
} from '#/services/tmdb/trending/trending.ts'
import { TimeWindow } from '#/models/timeWindow.ts'

const mockUseQuery = vi.fn()

vi.mock('@tanstack/react-query', () => ({
  useQuery: (config: unknown) => mockUseQuery(config),
}))

describe('Trending Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getTrendingMovies', () => {
    it('should call useQuery with correct configuration', () => {
      getTrendingMovies(1, TimeWindow.Day)

      expect(mockUseQuery).toHaveBeenCalled()
      const config = mockUseQuery.mock.calls[0][0]
      expect(config.queryKey).toEqual(['trending-movies', 1])
      expect(config.queryFn).toBeDefined()
      expect(typeof config.queryFn).toBe('function')
    })

    it('should accept different pages', () => {
      getTrendingMovies(5, TimeWindow.Week)
      const config = mockUseQuery.mock.calls[0][0]
      expect(config.queryKey).toEqual(['trending-movies', 5])
    })
  })

  describe('getTrendingTvShows', () => {
    it('should call useQuery with correct configuration', () => {
      getTrendingTvShows(1, TimeWindow.Day)

      expect(mockUseQuery).toHaveBeenCalled()
      const config = mockUseQuery.mock.calls[0][0]
      expect(config.queryKey).toEqual(['trending-tv-shows', 1])
      expect(config.queryFn).toBeDefined()
      expect(typeof config.queryFn).toBe('function')
    })

    it('should accept different pages', () => {
      getTrendingTvShows(3, TimeWindow.Week)
      const config = mockUseQuery.mock.calls[0][0]
      expect(config.queryKey).toEqual(['trending-tv-shows', 3])
    })
  })

  describe('getTrendingPeople', () => {
    it('should call useQuery with correct configuration', () => {
      getTrendingPeople(1, TimeWindow.Day)

      expect(mockUseQuery).toHaveBeenCalled()
      const config = mockUseQuery.mock.calls[0][0]
      expect(config.queryKey).toEqual(['trending-people', 1])
      expect(config.queryFn).toBeDefined()
      expect(typeof config.queryFn).toBe('function')
    })

    it('should accept different pages', () => {
      getTrendingPeople(2, TimeWindow.Week)
      const config = mockUseQuery.mock.calls[0][0]
      expect(config.queryKey).toEqual(['trending-people', 2])
    })
  })
})
