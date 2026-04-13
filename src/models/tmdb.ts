/** Resposta de paginação da API*/
export interface TMDBResponse<T> {
  page: number
  results: T
  total_pages: number
  total_results: number
}

/** Tamanhos de imagem disponíveis na API do TMDB */
export enum PosterSize {
  ExtraSmall = 'w92',
  Small = 'w154',
  Medium = 'w185',
  Large = 'w342',
  ExtraLarge = 'w500',
  Original = 'original',
}
