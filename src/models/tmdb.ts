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

/** Tamanhos de imagem disponíveis para backdrops na API do TMDB */
export enum BackDropSize {
  ExtraSmall = 'w300',
  Small = 'w780',
  Medium = 'w1280',
  Large = 'w1920',
  ExtraLarge = 'w2560',
  Original = 'original',
}
