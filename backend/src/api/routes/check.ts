import { FastifyPluginAsync } from 'fastify';
import { AnswerService } from '../../services/answer';

export function check(
    answerService: AnswerService,
): FastifyPluginAsync {
    return async function (fastify) {
        fastify.post<{ Body: { name: string } }>(
            '/check',
            async (request, reply) => {
                const check =
                    await answerService.checkAnswer(
                        request.body.name,
                    );
                return reply.send(check);
            },
        );
    };
}
