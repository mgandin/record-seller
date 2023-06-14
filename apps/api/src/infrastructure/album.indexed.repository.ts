import {
  AlbumNotFoundError,
  AlbumRepository,
} from "../domain/album.repository";
import { Album } from "../domain/album";

export class AlbumIndexedRepository implements AlbumRepository {
  constructor(
    private albumSqlRepository: AlbumRepository,
    private albumElasticSearchRepository: AlbumRepository
  ) {}

  async findAll(): Promise<Album[]> {
    return this.albumSqlRepository.findAll();
  }

  async findByName(name: string): Promise<Album | null> {
    const indexedAlbum = await this.albumElasticSearchRepository.findByName(
      name
    );
    if (!indexedAlbum) {
      const album = await this.albumSqlRepository.findByName(name);
      if (!album) {
        throw new AlbumNotFoundError(name);
      }
      return this.albumElasticSearchRepository.save(album);
    }
    return indexedAlbum;
  }

  async save(album: Album): Promise<Album | null> {
    const indexedAlbum = await this.albumElasticSearchRepository.findByName(
      album.name
    );
    if (!indexedAlbum) {
      const albumSql = await this.albumSqlRepository.findByName(album.name);
      if (!albumSql) {
        await this.albumSqlRepository.save(album);
      }
      return this.albumElasticSearchRepository.save(album);
    }
    return album;
  }
}
