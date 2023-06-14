import { afterEach, describe, expect, test, vi } from "vitest";
import { AddAlbumUsecase } from "../../src/domain/add-album.usecase";

describe("Add album  Usecase - test", () => {
  const albumRepositoryMock = {
    save: vi.fn(),
    findAll: vi.fn(),
    findByName: vi.fn(),
  };

  const addAlbumUsecase = new AddAlbumUsecase(albumRepositoryMock);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should add an album ", async () => {
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
    albumRepositoryMock.save.mockImplementation(() => expectedAlbum);

    // WHEN
    const albums = await addAlbumUsecase.command(expectedAlbum);

    // THEN
    expect(albumRepositoryMock.save).toHaveBeenCalledOnce();
    expect(albumRepositoryMock.save).toHaveBeenCalledWith(expectedAlbum);
    expect(albums).toStrictEqual(expectedAlbum);
  });
});
