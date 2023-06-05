import {Album} from "./album";
import {AlbumRepository} from "./album.repository";

export class SearchAlbumsUsecase {
    private albumRepository: AlbumRepository;

    constructor(albumRepository: AlbumRepository) {
        this.albumRepository = albumRepository;
    }

    async execute(): Promise<Album[]> {
        return await this.albumRepository.findAll();
    }
}
