import { FastifyPluginAsync } from 'fastify';
import { AnswerService } from '../../services/answer';

export function getNewestAnswerRef(
    answerService: AnswerService,
): FastifyPluginAsync {
    return async function (fastify) {
        fastify.get(
            '/newest-answer-ref',
            async (_, reply) => {
                const id =
                    await answerService.getNewestAnswerRef();
                return reply.send(id);
            },
        );
    };
}
