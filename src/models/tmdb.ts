/** Resposta de paginação da API*/
export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

/** Tamanhos de imagem disponíveis na API do TMDB */
export type PosterSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original'

/** Tamanhos de imagem disponíveis para backdrops na API do TMDB */
export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original'
