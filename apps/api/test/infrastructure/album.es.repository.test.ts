import { describe, expect, test } from "vitest";
import { Album } from "../../src/domain/album";
import { Client } from "@elastic/elasticsearch";
import * as fs from "fs";
import { AlbumElasticSearchRepository } from "../../src/infrastructure/album.es.repository";
import { config } from "../../src/config";

describe("Album Elastic Search Repository - test", () => {
  test("#index and search", async () => {
    // Given
    const album: Album = {
      id: 1,
      name: "Tweez",
      genre: "post-rock",
      artist: {
        id: 1,
        name: "Slint",
      },
      year: 1989,
    };

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
    const albumElasticSearchRepository = new AlbumElasticSearchRepository(
      client
    );

    // When
    await albumElasticSearchRepository.save(album);

    // Then
    const albumSearched = await albumElasticSearchRepository.findByName(
      album.name
    );
    expect(albumSearched).toStrictEqual(album);

    await client.deleteByQuery({
      index: "albums",
      query: {
        match: {
          name: album.name,
        },
      },
    });
  });
});
