import { describe, it, expect } from 'vitest'
import {
  TMDBBaseUrl,
  TMDBImageUrl,
  ApiHeaders,
  ApiQueryLanguage,
} from '#/services/tmdb/globals.ts'

describe('TMDB Constants', () => {
  it('should have correct base URL', () => {
    expect(TMDBBaseUrl).toBe('https://api.themoviedb.org/3')
  })

  it('should have correct image URL', () => {
    expect(TMDBImageUrl).toBe('https://image.tmdb.org/t/p')
  })

  it('should have API headers defined', () => {
    expect(ApiHeaders).toBeDefined()
    expect(ApiHeaders).toHaveProperty('Authorization')
    expect(ApiHeaders).toHaveProperty('accept')
    expect(ApiHeaders.accept).toBe('application/json')
  })

  it('should have correct query language', () => {
    expect(ApiQueryLanguage).toBe('language=pt-BR')
  })
})
