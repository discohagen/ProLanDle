import { FastifyPluginAsync } from 'fastify';
import { AnswerService } from '../services/answer';
import { getLanguages } from './routes/getLanguages';
import { check } from './routes/check';

export function createApi(
    answerService: AnswerService,
): FastifyPluginAsync {
    return async function (fastify) {
        fastify.get('/health', async () => {
            return { status: 'ok' };
        });
        fastify.register(getLanguages(answerService));
        fastify.register(check(answerService));
    };
}
