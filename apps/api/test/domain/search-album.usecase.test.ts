import { afterEach, describe, expect, test, vi } from "vitest";
import { SearchAlbumUsecase } from "../../src/domain/search-album.usecase";

describe("Find album by name Usecase - test", () => {
  const albumRepositoryMock = {
    save: vi.fn(),
    findAll: vi.fn(),
    findByName: vi.fn(),
  };

  const searchAlbumUsecase = new SearchAlbumUsecase(albumRepositoryMock);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should find an album by name ", async () => {
    // GIVEN
    const expectedAlbum = {
      id: 1,
      name: "Tweez",
      genre: "post-rock",
      artist: {
        id: 1,
        name: "Slint",
      },
      year: 1989,
    };
    albumRepositoryMock.findByName.mockImplementation(() => expectedAlbum);

    // WHEN
    const albums = await searchAlbumUsecase.query("Tweez");

    // THEN
    expect(albumRepositoryMock.findByName).toHaveBeenCalledOnce();
    expect(albums).toStrictEqual(expectedAlbum);
  });
});
