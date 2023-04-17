import fastify, {FastifyInstance} from "fastify";
import {registerRecordRoutes} from "./api/record.api";
import {initRecordContainer} from "./domain/record.container";

const server: FastifyInstance = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
            },
        },
    }
});

// Run the server!
const start = async () => {
    try {
        const recordContainer = initRecordContainer()
        registerRecordRoutes(server, recordContainer);

        await server.listen({ host: '0.0.0.0', port: process.env.PORT as unknown as number || 3000 })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start();