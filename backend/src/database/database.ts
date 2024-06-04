import { knex } from 'knex';
import path from 'path';

export function createConnection() {
    return knex({
        client: 'better-sqlite3',
        connection: {
            filename: './main.db',
        },
        pool: {
            afterCreate: (
                conne: { pragma(q: string): void },
                done: () => void,
            ) => {
                conne.pragma('foreign_keys = ON');
                done();
            },
        },
        migrations: {
            directory: path.join(__dirname, 'migrations'),
        },
        useNullAsDefault: true,
    });
}
