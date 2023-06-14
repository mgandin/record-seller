import { beforeAll, describe, expect, test } from "vitest";
import { prisma } from "../../db";
import { AlbumSqlRepository } from "../../src/infrastructure/album.sql.repository";

describe("Album SQL Repository - test", () => {
  const albumRepository = new AlbumSqlRepository();

  beforeAll(async () => {
    await prisma.albumSqlModel.deleteMany();
    await prisma.artistSqlModel.deleteMany();
  });

  test("#findall", async () => {
    // GIVEN

    const insertedArtist = await prisma.artistSqlModel.create({
      data: {
        name: "Slint",
      },
    });
    const insertedAlbum = await prisma.albumSqlModel.create({
      data: {
        name: "Tweez",
        genre: "post-rock",
        year: 1989,
        artistId: insertedArtist.id,
      },
    });
    const expectedAlbum = [
      {
        id: insertedAlbum.id,
        name: "Tweez",
        genre: "post-rock",
        year: 1989,
        artist: {
          id: insertedArtist.id,
          name: "Slint",
        },
      },
    ];

    // WHEN
    const albums = await albumRepository.findAll();

    // THEN
    expect(albums).toEqual(expectedAlbum);
  });
});
