import { Album } from "./album";

export interface AlbumRepository {
  findAll(): Promise<Album[]>;
  findByName(name: string): Promise<Album | null>;
  save(album: Album): Promise<Album | null>;
}
