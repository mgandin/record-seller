import fastify, { FastifyInstance } from "fastify";
import { registerAlbumRoutes } from "./api/album.api";
import { initAlbumContainer } from "./domain/album.container";

const server: FastifyInstance = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
      },
    },
  },
});

// Run the server!
const start = async () => {
  try {
    const albumContainer = initAlbumContainer();
    registerAlbumRoutes(server, albumContainer);

    await server.listen({
      host: "0.0.0.0",
      port: (process.env.PORT as unknown as number) || 3000,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
