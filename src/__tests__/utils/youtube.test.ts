import { describe, it, expect } from 'vitest'
import { getYouTubeEmbedUrl, getYouTubeUrl } from '#/utils/youtube.ts'

describe('getYouTubeEmbedUrl', () => {
  it('should return embed URL for valid video key', () => {
    expect(getYouTubeEmbedUrl('abc123')).toBe(
      'https://www.youtube.com/embed/abc123',
    )
    expect(getYouTubeEmbedUrl('dQw4w9WgXcQ')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
    )
  })

  it('should handle empty string', () => {
    expect(getYouTubeEmbedUrl('')).toBe('https://www.youtube.com/embed/')
  })
})

describe('getYouTubeUrl', () => {
  it('should return watch URL for valid video key', () => {
    expect(getYouTubeUrl('abc123')).toBe(
      'https://www.youtube.com/watch?v=abc123',
    )
    expect(getYouTubeUrl('dQw4w9WgXcQ')).toBe(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    )
  })

  it('should return undefined for undefined input', () => {
    expect(getYouTubeUrl(undefined)).toBeUndefined()
  })

  it('should return undefined for empty string', () => {
    expect(getYouTubeUrl('')).toBeUndefined()
  })
})
