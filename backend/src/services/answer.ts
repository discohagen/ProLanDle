import { Knex } from 'knex';
import { ProgrammingLanguage } from '../database/rows';

type Check = 'correct' | 'semi-correct' | 'incorrect';
type NumericCheck = 'up' | 'down' | 'equal';

type languageCheck = {
    name: {
        value: string;
        check: Check;
    };
    paradigm: {
        value: string[];
        check: Check;
    };
    typeSystem: {
        value: string;
        check: Check;
    };
    translatingMethod: {
        value: string;
        check: Check;
    };
    rank: {
        value: number;
        check: NumericCheck;
    };
    year: {
        value: number;
        check: NumericCheck;
    };
};

export class AnswerService {
    constructor(private readonly knex: Knex) {}

    async getLanguages(): Promise<ProgrammingLanguage[]> {
        return await this.knex(
            'programmingLanguages',
        ).select('name');
    }

    async checkAnswer(
        toCheck: string,
    ): Promise<languageCheck> {
        const toCheckEntry = await this.knex(
            'programmingLanguages',
        )
            .select()
            .whereRaw(
                'lower(name) = ?',
                toCheck.toLowerCase(),
            )
            .first();
        if (!toCheckEntry) {
            throw new Error('Could not find the language');
        }
        const todaysAnswer = await this.getTodaysAnswer();
        const check: languageCheck = {
            name: {
                value: toCheckEntry.name,
                check: 'incorrect',
            },
            paradigm: {
                value: JSON.parse(toCheckEntry.paradigm),
                check: 'incorrect',
            },
            typeSystem: {
                value: toCheckEntry.typeSystem,
                check: 'incorrect',
            },
            translatingMethod: {
                value: toCheckEntry.translatingMethod,
                check: 'incorrect',
            },
            rank: {
                value: toCheckEntry.rank,
                check: 'equal',
            },
            year: {
                value: toCheckEntry.year,
                check: 'equal',
            },
        };
        if (
            todaysAnswer.name.toLowerCase() ===
            toCheckEntry.name.toLowerCase()
        ) {
            return {
                name: {
                    value: toCheckEntry.name,
                    check: 'correct',
                },
                paradigm: {
                    value: JSON.parse(
                        toCheckEntry.paradigm,
                    ),
                    check: 'correct',
                },
                typeSystem: {
                    value: toCheckEntry.typeSystem,
                    check: 'correct',
                },
                translatingMethod: {
                    value: toCheckEntry.translatingMethod,
                    check: 'correct',
                },
                rank: {
                    value: toCheckEntry.rank,
                    check: 'equal',
                },
                year: {
                    value: toCheckEntry.year,
                    check: 'equal',
                },
            };
        }
        const toCheckParadigm = JSON.parse(
            toCheckEntry.paradigm,
        ) as string[];
        const answerParadigm = JSON.parse(
            todaysAnswer.paradigm,
        ) as string[];
        const paradigmIntersection = toCheckParadigm.filter(
            (value) => answerParadigm.includes(value),
        );
        if (
            paradigmIntersection.length ===
                toCheckParadigm.length &&
            paradigmIntersection.length ===
                answerParadigm.length
        ) {
            check.paradigm.check = 'correct';
        } else if (paradigmIntersection.length === 0) {
            check.paradigm.check = 'incorrect';
        } else {
            check.paradigm.check = 'semi-correct';
        }
        if (
            todaysAnswer.typeSystem ===
            toCheckEntry.typeSystem
        ) {
            check.typeSystem.check = 'correct';
        }
        if (
            todaysAnswer.translatingMethod ===
            toCheckEntry.translatingMethod
        ) {
            check.translatingMethod.check = 'correct';
        }
        if (todaysAnswer.rank > toCheckEntry.rank) {
            check.rank.check = 'down';
        } else if (todaysAnswer.rank < toCheckEntry.rank) {
            check.rank.check = 'up';
        }
        if (todaysAnswer.year < toCheckEntry.year) {
            check.year.check = 'down';
        } else if (todaysAnswer.year > toCheckEntry.year) {
            check.year.check = 'up';
        }
        return check;
    }

    async getTodaysAnswer(): Promise<ProgrammingLanguage> {
        const date = await this.getDate();
        return await this.knex('programmingLanguages')
            .join(
                'todaysLanguage',
                'programmingLanguages.name',
                'todaysLanguage.name',
            )
            .where('todaysLanguage.date', date)
            .select('programmingLanguages.*')
            .first();
    }

    async setTodaysAnswer() {
        const date = await this.getDate();
        const dbEntry = await this.getTodaysAnswer();
        if (dbEntry) {
            return;
        }
        const randomLanguage = await this.knex(
            'programmingLanguages',
        )
            .select('name')
            .first()
            .orderByRaw('random()');
        if (!randomLanguage) {
            throw new Error(
                'Could not find a language with the given rank',
            );
        }
        await this.knex('todaysLanguage').insert({
            date: date,
            name: randomLanguage.name,
        });
        return;
    }

    async getDate(): Promise<string> {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
}
