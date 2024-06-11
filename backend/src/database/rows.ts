export type ProgrammingLanguage = {
    name: string;
    paradigm: string;
    typeSystem: string;
    translatingMethod: string;
    rank: number;
    year: number;
};

export type TodaysLanguage = {
    id: number;
    date: string;
    name: string;
};

declare module 'knex/types/tables' {
    interface Tables {
        programmingLanguages: ProgrammingLanguage;
        todaysLanguages: TodaysLanguage;
    }
}
