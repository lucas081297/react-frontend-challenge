export const TMDBBaseUrl = 'https://api.themoviedb.org/3'
export const TMDBImageUrl = 'https://image.tmdb.org/t/p'

export const TMDBApiKey = import.meta.env.VITE_TMDB_API_KEY

export const ApiHeaders: HeadersInit = {
  'Authorization': `Bearer ${TMDBApiKey}`,
  'accept': 'application/json',
}
