import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getPersonDetails } from '#/services/tmdb/people/person.ts'

const mockUseQuery = vi.fn()

vi.mock('@tanstack/react-query', () => ({
  useQuery: (config: unknown) => mockUseQuery(config),
}))

describe('getPersonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call useQuery with correct configuration', () => {
    const personId = 123
    getPersonDetails(personId)

    expect(mockUseQuery).toHaveBeenCalled()
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['person', personId])
    expect(config.queryFn).toBeDefined()
    expect(typeof config.queryFn).toBe('function')
  })

  it('should accept different person ids', () => {
    getPersonDetails(1)
    getPersonDetails(500)
    getPersonDetails(99999)

    const config1 = mockUseQuery.mock.calls[0][0]
    const config2 = mockUseQuery.mock.calls[1][0]
    const config3 = mockUseQuery.mock.calls[2][0]

    expect(config1.queryKey).toEqual(['person', 1])
    expect(config2.queryKey).toEqual(['person', 500])
    expect(config3.queryKey).toEqual(['person', 99999])
  })

  it('should handle zero as person id', () => {
    getPersonDetails(0)
    const config = mockUseQuery.mock.calls[0][0]
    expect(config.queryKey).toEqual(['person', 0])
  })
})
