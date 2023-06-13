import { describe, expect, test } from "vitest";
import { Album } from "../../src/domain/album";
import { Client } from "@elastic/elasticsearch";
import * as fs from "fs";
import { AlbumElasticSearchRepository } from "../../src/infrastructure/album.es.repository";
import { config } from "../../src/config";
import ClientMock from "@elastic/elasticsearch-mock";

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

    const mock = new ClientMock();
    mock.add(
      {
        method: ["GET", "POST"],
        path: ["/:index/_doc", "/:index/_search", "/:index/_refresh"],
      },
      () => {
        return {
          hits: {
            hits: [{ _source: album }],
          },
        };
      }
    );
    const client = new Client({
      node: config.ES_URL,
      Connection: mock.getConnection(),
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
  });
});
