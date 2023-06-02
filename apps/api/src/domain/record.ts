export type Record = {
  id: number,
  name: string,
  genre: string,
  artist: Artist,
  year: number
}

export type Artist = {
  id: number,
  name: string
}