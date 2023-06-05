import { AlbumSqlRepository } from "../infrastructure/album.sql.repository";
import { AlbumRepository } from "./album.repository";
import { SearchAlbumsUsecase } from "./search-albums.usecase";

export type AlbumContainer = {
  searchRecordsUsecase: SearchAlbumsUsecase;
}

export const initAlbumContainer = (): AlbumContainer =>  {
    const albumRepository: AlbumRepository = new AlbumSqlRepository();
    const searchRecordsUsecase: SearchAlbumsUsecase = new SearchAlbumsUsecase(albumRepository);

    return {
      searchRecordsUsecase,
    }
}