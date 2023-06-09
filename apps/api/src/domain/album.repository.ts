import { Album } from "./album";

export interface AlbumRepository {
  findAll(): Promise<Album[]>;
  findById(id: number): Promise<Album | null>;
  findByName(name: string): Promise<Album | null>;
  save(album: Album): Promise<Album | null>;
}
