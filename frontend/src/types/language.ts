export type Check = "correct" | "semi-correct" | "incorrect";

export type NumericCheck = "up" | "down" | "equal";

export type LanguageCheck = Record<
  "name" | "paradigm" | "typeSystem" | "translatingMethod" | "rank" | "year",
  | {
      value: string | string[];
      check: Check;
    }
  | {
      value: number;
      check: NumericCheck;
    }
>;

export type Language = {
  name: string;
};

export type NewestAnswerRef = {
  id: number;
}