export interface Genres {
  id: number,
  name: string
}

export type MovieGenresResponse = {
  genres: Genres[]
}