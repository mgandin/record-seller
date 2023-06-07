import { AlbumSqlRepository } from "../infrastructure/album.sql.repository";
import { AlbumRepository } from "./album.repository";
import { SearchAlbumsUsecase } from "./search-albums.usecase";
import { AddAlbumUsecase } from "./add-album.usecase";

export type AlbumContainer = {
  searchRecordsUsecase: SearchAlbumsUsecase;
  addAlbumUsecase: AddAlbumUsecase;
};

export const initAlbumContainer = (): AlbumContainer => {
  const albumRepository: AlbumRepository = new AlbumSqlRepository();
  const searchRecordsUsecase: SearchAlbumsUsecase = new SearchAlbumsUsecase(
    albumRepository
  );
  const addAlbumUsecase: AddAlbumUsecase = new AddAlbumUsecase(albumRepository);
  return {
    searchRecordsUsecase,
    addAlbumUsecase,
  };
};
