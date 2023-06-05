import { FastifyInstance } from "fastify";
import { AlbumContainer } from "../domain/album.container";

export const registerAlbumRoutes = (server: FastifyInstance, container: AlbumContainer) => {
    server.route({
        method: 'GET',
        url: '/albums',
        handler: async (_request, reply) => {
            const albums = await container.searchRecordsUsecase.execute();
            reply.status(200).send(albums);
        }
    });
}