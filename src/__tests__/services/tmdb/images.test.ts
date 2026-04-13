import { describe, it, expect } from 'vitest'
import { getPosterUrl } from '#/services/tmdb/images/images.ts'
import { PosterSize } from '#/models/tmdb.ts'

describe('getPosterUrl', () => {
  it('should return complete poster URL', () => {
    const result = getPosterUrl('/poster123.jpg', PosterSize.Large)
    expect(result).toBe('https://image.tmdb.org/t/p/w342//poster123.jpg')
  })

  it('should return undefined for undefined path', () => {
    const result = getPosterUrl(undefined, PosterSize.Large)
    expect(result).toBeUndefined()
  })

  it('should return undefined for empty string path', () => {
    const result = getPosterUrl('', PosterSize.Original)
    expect(result).toBeUndefined()
  })

  it('should work with different poster sizes', () => {
    expect(getPosterUrl('/test.jpg', PosterSize.ExtraSmall)).toContain('w92')
    expect(getPosterUrl('/test.jpg', PosterSize.Small)).toContain('w154')
    expect(getPosterUrl('/test.jpg', PosterSize.Medium)).toContain('w185')
    expect(getPosterUrl('/test.jpg', PosterSize.Large)).toContain('w342')
    expect(getPosterUrl('/test.jpg', PosterSize.ExtraLarge)).toContain('w500')
    expect(getPosterUrl('/test.jpg', PosterSize.Original)).toContain('original')
  })
})
