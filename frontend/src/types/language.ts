export type Check =
    | 'correct'
    | 'semi-correct'
    | 'incorrect';

export type NumericCheck = 'up' | 'down' | 'equal';

export type languageCheck = {
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

export type Language = {
    name: string;
};
