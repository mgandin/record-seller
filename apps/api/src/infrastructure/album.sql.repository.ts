import { AlbumRepository } from "../domain/album.repository";
import { prisma } from "../../db";
import { Album } from "../domain/album";

export class AlbumSqlRepository implements AlbumRepository {
  async findAll(): Promise<Album[]> {
    const albums = await prisma.albumSqlModel.findMany({
      include: {
        artist: true,
      },
    });
    return albums.map(
      (album) =>
        ({
          id: album.id,
          name: album.name,
          genre: album.genre,
          year: album.year,
          artist: album.artist,
        } as Album)
    );
  }

  async findById(id: number): Promise<Album | null> {
    const album = await prisma.albumSqlModel.findUnique({
      where: {
        id,
      },
      include: {
        artist: true,
      },
    });
    return album !== null
      ? ({
          id: album.id,
          name: album.name,
          genre: album.genre,
          year: album.year,
          artist: album.artist,
        } as Album)
      : null;
  }

  async findByName(name: string): Promise<Album | null> {
    const album = await prisma.albumSqlModel.findFirst({
      where: {
        name,
      },
      include: {
        artist: true,
      },
    });
    return album !== null
      ? ({
          id: album.id,
          name: album.name,
          genre: album.genre,
          year: album.year,
          artist: album.artist,
        } as Album)
      : null;
  }

  async save(album: Album): Promise<Album | null> {
    const albumSaved = await prisma.albumSqlModel.create({
      data: {
        name: album.name,
        genre: album.genre,
        year: album.year,
        artistId: album.artist.id,
      },
    });

    return await this.findById(albumSaved.id);
  }
}
