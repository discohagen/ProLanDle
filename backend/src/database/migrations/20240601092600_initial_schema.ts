import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema
        .createTable('programmingLanguages', (t) => {
            t.string('name').primary();
            t.string('paradigm').notNullable();
            t.string('typeSystem').notNullable();
            t.string('translatingMethod').notNullable();
            t.integer('rank').notNullable();
            t.integer('year').notNullable();
        })
        .createTable('todaysLanguage', (t) => {
            t.increments('id').primary();
            t.string('date');
            t.string('name')
                .references('programmingLanguages.name')
                .onDelete('CASCADE');
        });
    await knex('programmingLanguages').insert([
        {
            name: 'Python',
            paradigm: JSON.stringify([
                'objectoriented',
                'imperative',
            ]),
            typeSystem: 'dynamic',
            translatingMethod: 'interpreted',
            rank: 1,
            year: 1991,
        },
        {
            name: 'Java',
            paradigm: JSON.stringify([
                'objectoriented',
                'functional',
            ]),
            typeSystem: 'static',
            translatingMethod: 'interpreted',
            rank: 2,
            year: 1995,
        },
        {
            name: 'C++',
            paradigm: JSON.stringify([
                'imperative',
                'functional',
                'objectoriented',
            ]),
            typeSystem: 'static',
            translatingMethod: 'compiled',
            rank: 3,
            year: 1985,
        },
        {
            name: 'C',
            paradigm: JSON.stringify(['imperative']),
            typeSystem: 'static',
            translatingMethod: 'compiled',
            rank: 4,
            year: 1972,
        },
        {
            name: 'JavaScript',
            paradigm: JSON.stringify([
                'functional',
                'objectoriented',
                'imperative',
            ]),
            typeSystem: 'dynamic',
            translatingMethod: 'interpreted',
            rank: 5,
            year: 1995,
        },
        {
            name: 'C#',
            paradigm: JSON.stringify([
                'objectoriented',
                'imperative',
                'functional',
            ]),
            typeSystem: 'static',
            translatingMethod: 'compiled',
            rank: 6,
            year: 2000,
        },
        {
            name: 'Go',
            paradigm: JSON.stringify([
                'imperativ',
                'objectoriented',
            ]),
            typeSystem: 'static',
            translatingMethod: 'compiled',
            rank: 7,
            year: 2009,
        },
        {
            name: 'Typescript',
            paradigm: JSON.stringify([
                'functional',
                'objectoriented',
                'imperative',
            ]),
            typeSystem: 'static',
            translatingMethod: 'interpreted',
            rank: 8,
            year: 2012,
        },
        {
            name: 'R',
            paradigm: JSON.stringify([
                'objectoriented',
                'imperative',
                'functional',
            ]),
            typeSystem: 'dynamic',
            translatingMethod: 'interpreted',
            rank: 9,
            year: 1993,
        },
        {
            name: 'Bash',
            paradigm: JSON.stringify(['imperative']),
            typeSystem: 'dynamic',
            translatingMethod: 'interpreted',
            rank: 10,
            year: 1989,
        },
        {
            name: 'PHP',
            paradigm: JSON.stringify([
                'imperative',
                'objectoriented',
            ]),
            typeSystem: 'dynamic',
            translatingMethod: 'interpreted',
            rank: 11,
            year: 1995,
        },
        {
            name: 'Ruby',
            paradigm: JSON.stringify([
                'imperative',
                'objectoriented',
            ]),
            typeSystem: 'dynamic',
            translatingMethod: 'interpreted',
            rank: 12,
            year: 1995,
        },
        {
            name: 'SAS',
            paradigm: JSON.stringify(['imperative']),
            typeSystem: 'dynamic',
            translatingMethod: 'interpreted',
            rank: 13,
            year: 1976,
        },
        {
            name: 'Swift',
            paradigm: JSON.stringify([
                'objectoriented',
                'functional',
                'imperative',
            ]),
            typeSystem: 'static',
            translatingMethod: 'compiled',
            rank: 14,
            year: 2014,
        },
        {
            name: 'Dart',
            paradigm: JSON.stringify([
                'objectoriented',
                'imperative',
                'functional',
            ]),
            typeSystem: 'static',
            translatingMethod: 'compiled',
            rank: 15,
            year: 2011,
        },
        {
            name: 'Rust',
            paradigm: JSON.stringify([
                'imperative',
                'objectoriented',
                'functional',
            ]),
            typeSystem: 'static',
            translatingMethod: 'compiled',
            rank: 16,
            year: 2015,
        },
        {
            name: 'Kotlin',
            paradigm: JSON.stringify([
                'objectoriented',
                'functional',
            ]),
            typeSystem: 'static',
            translatingMethod: 'interpreted',
            rank: 17,
            year: 2011,
        },
        {
            name: 'Scala',
            paradigm: JSON.stringify([
                'objectoriented',
                'functional',
            ]),
            typeSystem: 'static',
            translatingMethod: 'interpreted',
            rank: 18,
            year: 2004,
        },
        {
            name: 'Assembly',
            paradigm: JSON.stringify(['imperative']),
            typeSystem: 'static',
            translatingMethod: 'compiled',
            rank: 19,
            year: 1947,
        },
        {
            name: 'Perl',
            paradigm: JSON.stringify([
                'imperative',
                'objectoriented',
            ]),
            typeSystem: 'dynamic',
            translatingMethod: 'interpreted',
            rank: 20,
            year: 1987,
        },
        {
            name: 'Lua',
            paradigm: JSON.stringify([
                'imperative',
                'objectoriented',
                'functional',
            ]),
            typeSystem: 'dynamic',
            translatingMethod: 'interpreted',
            rank: 21,
            year: 1993,
        },
        {
            name: 'Cobol',
            paradigm: JSON.stringify(['imperative']),
            typeSystem: 'static',
            translatingMethod: 'compiled',
            rank: 22,
            year: 1959,
        },
        {
            name: 'ABAP',
            paradigm: JSON.stringify([
                'imperative',
                'objectoriented',
            ]),
            typeSystem: 'static',
            translatingMethod: 'interpreted',
            rank: 23,
            year: 1983,
        },
        {
            name: 'Prolog',
            paradigm: JSON.stringify(['imperative']),
            typeSystem: 'dynamic',
            translatingMethod: 'interpreted',
            rank: 24,
            year: 1972,
        },
        {
            name: 'CoffeeScript',
            paradigm: JSON.stringify([
                'functional',
                'imperative',
            ]),
            typeSystem: 'dynamic',
            translatingMethod: 'interpreted',
            rank: 25,
            year: 2009,
        },
    ]);
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('accounts');
}
