import { AlbumRepository } from "../domain/album.repository";
import { prisma } from "../../db";
import { Album } from "../domain/album";

export class AlbumSqlRepository implements AlbumRepository {
    async findAll(): Promise<Album[]> {
      const albums = await prisma.albumSqlModel.findMany({
        include: {
          artist: true,
        }
      });
      return albums.map((album) => ({
        id: album.id,
        name: album.name,
        genre: album.genre,
        year: album.year,
        artist: album.artist
      } as Album));
    }
}
