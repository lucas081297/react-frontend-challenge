import { describe, it, expect } from 'vitest'
import { formatTimeFromMinutes } from '#/utils/timeFormatter.ts'

describe('formatTimeFromMinutes', () => {
  it('should format minutes to hours and minutes', () => {
    expect(formatTimeFromMinutes(90)).toBe('1h 30m')
    expect(formatTimeFromMinutes(120)).toBe('2h')
    expect(formatTimeFromMinutes(45)).toBe('45m')
  })

  it('should handle zero minutes', () => {
    expect(formatTimeFromMinutes(0)).toBe('')
  })

  it('should handle exact hours', () => {
    expect(formatTimeFromMinutes(60)).toBe('1h')
    expect(formatTimeFromMinutes(180)).toBe('3h')
  })

  it('should handle minutes less than 60', () => {
    expect(formatTimeFromMinutes(30)).toBe('30m')
    expect(formatTimeFromMinutes(59)).toBe('59m')
  })

  it('should handle large durations', () => {
    expect(formatTimeFromMinutes(150)).toBe('2h 30m')
    expect(formatTimeFromMinutes(200)).toBe('3h 20m')
  })
})
