import { AlbumRepository } from "../domain/album.repository";
import { Album } from "../domain/album";
import { Client } from "@elastic/elasticsearch";
export class AlbumElasticSearchRepository implements AlbumRepository {
  constructor(private client: Client) {}

  async findAll(): Promise<Album[]> {
    const results = await this.client.search<Album>({
      index: "albums",
    });
    return results.hits.hits.map((hit) => hit._source as Album);
  }

  async findByName(name: string): Promise<Album | null> {
    const results = await this.client.search<Album>({
      index: "albums",
      query: {
        match: {
          name,
        },
      },
    });
    return results.hits.hits[0]._source ?? null;
  }

  async save(album: Album): Promise<Album | null> {
    await this.client.index({
      index: "albums",
      document: album,
    });
    await this.client.indices.refresh({ index: "albums" });
    return this.findByName(album.name);
  }
}
