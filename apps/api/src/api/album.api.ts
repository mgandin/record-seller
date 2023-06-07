import { FastifyInstance } from "fastify";
import { AlbumContainer } from "../domain/album.container";
import { Album } from "../domain/album";

export const registerAlbumRoutes = (
  server: FastifyInstance,
  container: AlbumContainer
) => {
  server.route({
    method: "GET",
    url: "/albums",
    handler: async (_request, reply) => {
      const albums = await container.searchRecordsUsecase.query();
      reply.status(200).send(albums);
    },
  });

  server.route({
    method: "POST",
    url: "/album",
    handler: async (_request, reply) => {
      const body = _request.body as Album;
      console.log(body);
      const album = await container.addAlbumUsecase.command(body);
      reply.status(200).send(album);
    },
  });
};
