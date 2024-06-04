import Fastify from 'fastify';
import { createConnection } from './database/database';
import { AnswerService } from './services/answer';
import { CronJob } from 'cron';
import { createApi } from './api/api';
import cors from '@fastify/cors';

const fastify = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
            },
        },
    },
});
fastify.register(cors);

const dbCon = createConnection();

(async () => {
    await dbCon.migrate.latest();
    const answerService = new AnswerService(dbCon);
    CronJob.from({
        cronTime: '0 0 0 * * *',
        onTick: async () => {
            await answerService.setTodaysAnswer();
        },
        start: true,
        timeZone: 'Europe/Berlin',
        runOnInit: true,
    });
    fastify.register(createApi(answerService));
    fastify.listen({ port: 3000 }, (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        fastify.log.info(`server listening on ${address}`);
    });
})();
