import { AlbumSqlRepository } from "../infrastructure/album.sql.repository";
import { AlbumRepository } from "./album.repository";
import { SearchAlbumsUsecase } from "./search-albums.usecase";
import { AddAlbumUsecase } from "./add-album.usecase";
import { AlbumElasticSearchRepository } from "../infrastructure/album.es.repository";
import { Client } from "@elastic/elasticsearch";
import { config } from "../config";
import fs from "fs";
import { AlbumIndexedRepository } from "../infrastructure/album.indexed.repository";

export type AlbumContainer = {
  searchRecordsUsecase: SearchAlbumsUsecase;
  addAlbumUsecase: AddAlbumUsecase;
};

export const initAlbumContainer = (): AlbumContainer => {
  const albumSqlRepository: AlbumRepository = new AlbumSqlRepository();
  const client = new Client({
    node: config.ES_URL,
    auth: {
      username: config.ELASTIC_USER,
      password: config.ELASTIC_PASSWORD,
    },
    tls: {
      ca: fs.readFileSync(config.ELASTIC_CA_FILE),
      rejectUnauthorized: false,
    },
  });
  const albumElasticSearchRepository = new AlbumElasticSearchRepository(client);
  const albumRepository = new AlbumIndexedRepository(
    albumSqlRepository,
    albumElasticSearchRepository
  );
  const searchRecordsUsecase: SearchAlbumsUsecase = new SearchAlbumsUsecase(
    albumRepository
  );
  const addAlbumUsecase: AddAlbumUsecase = new AddAlbumUsecase(albumRepository);
  return {
    searchRecordsUsecase,
    addAlbumUsecase,
  };
};
