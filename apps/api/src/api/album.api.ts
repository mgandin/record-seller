import { FastifyInstance, FastifyRequest } from "fastify";
import { AlbumContainer } from "../album.container";
import { Album } from "../domain/album";
type AlbumRequest = FastifyRequest<{
  Querystring: { name: string };
}>;
export const registerAlbumRoutes = (
  server: FastifyInstance,
  container: AlbumContainer
) => {
  server.route({
    method: "GET",
    url: "/albums",
    handler: async (_request, reply) => {
      const albums = await container.searchAlbumsUsecase.query();
      reply.status(200).send(albums);
    },
  });

  server.route({
    method: "GET",
    url: "/album",
    handler: async (_request: AlbumRequest, reply) => {
      const { name } = _request.query;
      const albums = await container.searchAlbumUsecase.query(name);
      reply.status(200).send(albums);
    },
  });

  server.route({
    method: "POST",
    url: "/album",
    handler: async (_request, reply) => {
      const body = _request.body as Album;
      const album = await container.addAlbumUsecase.command(body);
      reply.status(200).send(album);
    },
  });
};
