import { afterEach, describe, expect, test, vi } from "vitest";
import { SearchAlbumsUsecase } from "../../src/domain/search-albums.usecase";

describe("Find albums Usecase - test", () => {
  const albumRepositoryMock = {
    save: vi.fn(),
    findAll: vi.fn(),
    findById: vi.fn(),
  };

  const searchAlbumsUsecase = new SearchAlbumsUsecase(albumRepositoryMock);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should find all albums ", async () => {
    // GIVEN
    const expectedAlbums = [
      {
        id: 1,
        name: "Tweez",
        genre: "post-rock",
        artist: {
          id: 1,
          name: "Slint",
        },
        year: 1989,
      },
    ];
    albumRepositoryMock.findAll.mockImplementation(() => expectedAlbums);

    // WHEN
    const albums = await searchAlbumsUsecase.query();

    // THEN
    expect(albumRepositoryMock.findAll).toHaveBeenCalledOnce();
    expect(albums).toStrictEqual(expectedAlbums);
  });
});
