import { AlbumSqlRepository } from "./infrastructure/album.sql.repository";
import { AlbumRepository } from "./domain/album.repository";
import { SearchAlbumsUsecase } from "./domain/search-albums.usecase";
import { AddAlbumUsecase } from "./domain/add-album.usecase";
import { AlbumElasticSearchRepository } from "./infrastructure/album.es.repository";
import { Client } from "@elastic/elasticsearch";
import { config } from "./config";
import fs from "fs";
import { AlbumIndexedRepository } from "./infrastructure/album.indexed.repository";
import { SearchAlbumUsecase } from "./domain/search-album.usecase";
import { prisma } from "../db";

export type AlbumContainer = {
  searchAlbumsUsecase: SearchAlbumsUsecase;
  searchAlbumUsecase: SearchAlbumUsecase;
  addAlbumUsecase: AddAlbumUsecase;
};

export const initAlbumContainer = (): AlbumContainer => {
  const albumSqlRepository: AlbumRepository = new AlbumSqlRepository(prisma);
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
  const searchAlbumsUsecase: SearchAlbumsUsecase = new SearchAlbumsUsecase(
    albumRepository
  );
  const searchAlbumUsecase: SearchAlbumUsecase = new SearchAlbumUsecase(
    albumRepository
  );
  const addAlbumUsecase: AddAlbumUsecase = new AddAlbumUsecase(albumRepository);
  return {
    searchAlbumsUsecase,
    searchAlbumUsecase,
    addAlbumUsecase,
  };
};
