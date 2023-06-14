import { Album } from "./album";
import { AlbumRepository } from "./album.repository";

export class SearchAlbumUsecase {
  private albumRepository: AlbumRepository;

  constructor(albumRepository: AlbumRepository) {
    this.albumRepository = albumRepository;
  }

  async query(name: string): Promise<Album> {
    const maybeAlbum = await this.albumRepository.findByName(name);
    if (!maybeAlbum) throw new Error("Not Found");
    return maybeAlbum;
  }
}
