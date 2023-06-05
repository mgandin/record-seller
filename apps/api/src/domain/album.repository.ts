import { Album } from "./album";

export interface AlbumRepository {
    findAll(): Promise<Album[]>
}