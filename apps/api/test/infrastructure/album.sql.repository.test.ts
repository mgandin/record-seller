import { beforeAll, describe, expect, test } from "vitest";
import { AlbumSqlRepository } from "../../src/infrastructure/album.sql.repository";
import { ArtistSqlModel, PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";
import { AlbumSqlModel } from ".prisma/client";

describe("Album SQL Repository - test", () => {
  const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
  const albumRepository = new AlbumSqlRepository(prismaMock);

  beforeAll(() => {
    mockReset(prismaMock);
  });

  test("#findall", async () => {
    // GIVEN
    const expectedAlbum = [
      {
        id: 1,
        name: "Tweez",
        genre: "post-rock",
        year: 1989,
        artist: {
          id: 1,
          name: "Slint",
        },
      },
    ];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prismaMock.albumSqlModel.findMany.mockResolvedValue([
      {
        id: 1,
        name: "Tweez",
        genre: "post-rock",
        year: 1989,
        artistId: 1,
        artist: {
          id: 1,
          name: "Slint",
        },
      } as AlbumSqlModel & { artist: ArtistSqlModel },
    ]);

    // WHEN
    const albums = await albumRepository.findAll();

    // THEN
    expect(albums).toEqual(expectedAlbum);
  });
});
