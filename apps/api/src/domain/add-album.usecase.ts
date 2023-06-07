import { AlbumRepository } from "./album.repository";
import { Album } from "./album";

export class AddAlbumUsecase {
  private albumRepository: AlbumRepository;

  constructor(albumRepository: AlbumRepository) {
    this.albumRepository = albumRepository;
  }

  async command(album: Album): Promise<Album | null> {
    return await this.albumRepository.save(album);
  }
}
