export type ProgrammingLanguage = {
    name: string;
    paradigm: string;
    typeSystem: string;
    translatingMethod: string;
    rank: number;
    year: number;
};

declare module 'knex/types/tables' {
    interface Tables {
        programmingLanguages: ProgrammingLanguage;
    }
}
