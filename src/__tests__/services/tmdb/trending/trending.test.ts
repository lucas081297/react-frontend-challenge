import { describe, it, expect, vi } from 'vitest'
import {
  getTrendingMovies,
  getTrendingTvShows,
  getTrendingPeople,
} from '#/services/tmdb/trending/trending.ts'
import { TimeWindow } from '#/models/timeWindow.ts'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn((config) => ({
    data: undefined,
    isLoading: false,
    isError: false,
    ...config,
  })),
}))

describe('Trending Services', () => {
  describe('getTrendingMovies', () => {
    it('should return query configuration', () => {
      const result = getTrendingMovies(1, TimeWindow.Day)
      expect(result).toBeDefined()
      expect(result.queryKey).toEqual(['trending-movies', 1])
    })

    it('should accept different pages', () => {
      const result = getTrendingMovies(5, TimeWindow.Week)
      expect(result.queryKey).toEqual(['trending-movies', 5])
    })

    it('should have query function', () => {
      const result = getTrendingMovies(1, TimeWindow.Day)
      expect(result.queryFn).toBeDefined()
      expect(typeof result.queryFn).toBe('function')
    })
  })

  describe('getTrendingTvShows', () => {
    it('should return query configuration', () => {
      const result = getTrendingTvShows(1, TimeWindow.Day)
      expect(result).toBeDefined()
      expect(result.queryKey).toEqual(['trending-tv-shows', 1])
    })

    it('should accept different pages', () => {
      const result = getTrendingTvShows(3, TimeWindow.Week)
      expect(result.queryKey).toEqual(['trending-tv-shows', 3])
    })

    it('should have query function', () => {
      const result = getTrendingTvShows(1, TimeWindow.Day)
      expect(result.queryFn).toBeDefined()
      expect(typeof result.queryFn).toBe('function')
    })
  })

  describe('getTrendingPeople', () => {
    it('should return query configuration', () => {
      const result = getTrendingPeople(1, TimeWindow.Day)
      expect(result).toBeDefined()
      expect(result.queryKey).toEqual(['trending-people', 1])
    })

    it('should accept different pages', () => {
      const result = getTrendingPeople(2, TimeWindow.Week)
      expect(result.queryKey).toEqual(['trending-people', 2])
    })

    it('should have query function', () => {
      const result = getTrendingPeople(1, TimeWindow.Day)
      expect(result.queryFn).toBeDefined()
      expect(typeof result.queryFn).toBe('function')
    })
  })
})
