import {FastifyInstance} from "fastify";
import {RecordContainer} from "../domain/record.container";

export const registerRecordRoutes = (server: FastifyInstance, container: RecordContainer) => {
    server.route({
        method: 'GET',
        url: '/records',
        handler: async (_request, reply) => {
            const records = await container.searchRecordsUsecase.execute();
            reply.status(200).send(records);
        }
    });
}