import { describe, it, expect, vi } from 'vitest'
import { getPersonDetails } from '#/services/tmdb/people/person.ts'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn((config) => ({
    data: undefined,
    isLoading: false,
    isError: false,
    ...config,
  })),
}))

describe('getPersonDetails', () => {
  it('should return query configuration with person id', () => {
    const personId = 123
    const result = getPersonDetails(personId)
    expect(result).toBeDefined()
    expect(result.queryKey).toEqual(['person', personId])
  })

  it('should have query function defined', () => {
    const result = getPersonDetails(456)
    expect(result.queryFn).toBeDefined()
    expect(typeof result.queryFn).toBe('function')
  })

  it('should accept different person ids', () => {
    const result1 = getPersonDetails(1)
    const result2 = getPersonDetails(500)
    const result3 = getPersonDetails(99999)
    expect(result1.queryKey).toEqual(['person', 1])
    expect(result2.queryKey).toEqual(['person', 500])
    expect(result3.queryKey).toEqual(['person', 99999])
  })

  it('should handle zero as person id', () => {
    const result = getPersonDetails(0)
    expect(result.queryKey).toEqual(['person', 0])
  })
})
