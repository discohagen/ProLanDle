import { FastifyPluginAsync } from 'fastify';
import { AnswerService } from '../../services/answer';

export function getLanguages(
    answerService: AnswerService,
): FastifyPluginAsync {
    return async function (fastify) {
        fastify.get('/languages', async (_, reply) => {
            const languages =
                await answerService.getLanguages();
            return reply.send(languages);
        });
    };
}
