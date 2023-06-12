import { Album } from "./album";

export class AlbumNotFoundError extends Error {
  constructor(albumName: string) {
    super(`could not find album with name: ${albumName}`);
  }
}
export interface AlbumRepository {
  findAll(): Promise<Album[]>;
  findByName(name: string): Promise<Album | null>;
  save(album: Album): Promise<Album | null>;
}
