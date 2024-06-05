import { Knex } from "knex";
import { ProgrammingLanguage } from "../database/rows";

type Check = "correct" | "semi-correct" | "incorrect";
type NumericCheck = "up" | "down" | "equal";

type LanguageCheck = Record<
  keyof ProgrammingLanguage,
  {
    value: string | number | string[];
    check: Check | NumericCheck;
  }
>;
export class AnswerService {
  constructor(private readonly knex: Knex) {}

  async getLanguages(): Promise<ProgrammingLanguage[]> {
    return await this.knex("programmingLanguages").select("name");
  }

  async checkAnswer(toCheck: string): Promise<LanguageCheck> {
    const toCheckEntry = await this.knex("programmingLanguages")
      .select()
      .whereRaw("lower(name) = ?", toCheck.toLowerCase())
      .first();

    if (!toCheckEntry) {
      throw new Error("Could not find the language");
    }

    const todaysAnswer = await this.getTodaysAnswer();

    const toCheckParadigm = JSON.parse(toCheckEntry.paradigm) as string[];
    const answerParadigm = JSON.parse(todaysAnswer.paradigm) as string[];

    return {
      name: {
        value: toCheckEntry.name,
        check: compareStrings(todaysAnswer.name, toCheckEntry.name),
      },
      paradigm: {
        value: toCheckParadigm,
        check: compareArrays(toCheckParadigm, answerParadigm),
      },
      typeSystem: {
        value: toCheckEntry.typeSystem,
        check: compareStrings(todaysAnswer.typeSystem, toCheckEntry.typeSystem),
      },
      translatingMethod: {
        value: toCheckEntry.translatingMethod,
        check: compareStrings(
          todaysAnswer.translatingMethod,
          toCheckEntry.translatingMethod
        ),
      },
      rank: {
        value: toCheckEntry.rank,
        check: compareNumbers(todaysAnswer.rank, toCheckEntry.rank, true),
      },
      year: {
        value: toCheckEntry.year,
        check: compareNumbers(todaysAnswer.year, toCheckEntry.year),
      },
    };
  }

  async getTodaysAnswer(): Promise<ProgrammingLanguage> {
    const date = await this.getDate();
    return await this.knex("programmingLanguages")
      .join(
        "todaysLanguage",
        "programmingLanguages.name",
        "todaysLanguage.name"
      )
      .where("todaysLanguage.date", date)
      .select("programmingLanguages.*")
      .first();
  }

  async setTodaysAnswer() {
    const date = await this.getDate();
    const dbEntry = await this.getTodaysAnswer();
    if (dbEntry) {
      return;
    }
    const randomLanguage = await this.knex("programmingLanguages")
      .select("name")
      .first()
      .orderByRaw("random()");
    if (!randomLanguage) {
      throw new Error("Could not find a language with the given rank");
    }
    await this.knex("todaysLanguage").insert({
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

const compareStrings = (a: string, b: string): Check => {
  return a === b ? "correct" : "incorrect";
};

const compareNumbers = (
  a: number,
  b: number,
  inverse: boolean = false
): NumericCheck => {
  if (a === b) {
    return "equal";
  }
  return a > b ? (inverse ? "down" : "up") : inverse ? "up" : "down";
};

const compareArrays = (a: string[], b: string[]): Check => {
  const intersection = a.filter((value) => b.includes(value));
  if (intersection.length === a.length && intersection.length === b.length) {
    return "correct";
  } else if (intersection.length === 0) {
    return "incorrect";
  } else {
    return "semi-correct";
  }
};
