import { describe, it, expect } from 'vitest'
import { formatDateFromString } from '#/utils/dateFormatter.ts'

describe('formatDateFromString', () => {
  it('should format date string to Brazilian Portuguese format', () => {
    // Testing with a known date: 2024-03-15
    const result = formatDateFromString('2024-03-15')
    expect(result).toContain('2024')
    expect(result).toContain('março')
    expect(result).toContain('15')
  })

  it('should handle different months', () => {
    expect(formatDateFromString('2024-01-01')).toContain('janeiro')
    expect(formatDateFromString('2024-12-25')).toContain('dezembro')
  })

  it('should handle single digit days and months', () => {
    const result = formatDateFromString('2024-01-05')
    expect(result).toContain('janeiro')
    expect(result).toContain('5')
  })

  it('should format complete date string', () => {
    const result = formatDateFromString('2023-06-20')
    expect(result).toMatch(/20 de junho de 2023/)
  })
})
