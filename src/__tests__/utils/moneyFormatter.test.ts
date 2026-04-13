import { describe, it, expect } from 'vitest'
import { formatMoneyToMillion } from '#/utils/moneyFormatter.ts'

describe('formatMoneyToMillion', () => {
  it('should format money to millions with M suffix', () => {
    expect(formatMoneyToMillion(1000000)).toBe('$1.00M')
    expect(formatMoneyToMillion(1500000)).toBe('$1.50M')
    expect(formatMoneyToMillion(50000000)).toBe('$50.00M')
  })

  it('should handle zero', () => {
    expect(formatMoneyToMillion(0)).toBe('$0.00M')
  })

  it('should handle large numbers', () => {
    expect(formatMoneyToMillion(1000000000)).toBe('$1000.00M')
  })

  it('should handle decimal results', () => {
    expect(formatMoneyToMillion(1234567)).toBe('$1.23M')
  })
})
