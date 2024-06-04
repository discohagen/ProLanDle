import { useEffect, useState } from 'react';
import { Input } from './components/Input';

type Language = {
    name: string;
};

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

function check(name: string) {
    return fetch('http://localhost:3000/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
        }),
    });
}

function getStyle(check: Check | NumericCheck) {
    if (check === 'correct' || check === 'equal') {
        return 'bg-green-600';
    }
    if (
        check === 'incorrect' ||
        check === 'up' ||
        check === 'down'
    ) {
        return 'bg-red-600';
    }
    return 'bg-orange-600';
}

function App() {
    const [languages, setLanguages] = useState<Language[]>(
        []
    );
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState<
        string | null
    >(null);
    const [languageCheck, setLanguageCheck] = useState<
        languageCheck[]
    >([]);
    const [done, setDone] = useState(false);
    const [dropdownVisible, setDropdownVisible] =
        useState(false);
    const [filteredLanguages, setfilteredLanguages] =
        useState<Language[]>([]);
    useEffect(() => {
        fetch('http://localhost:3000/languages')
            .then((response) => response.json())
            .then((data) => setLanguages(data));
    }, []);
    useEffect(() => {
        if (inputValue.length > 0) {
            setDropdownVisible(true);
            setfilteredLanguages(
                languages.filter((language) =>
                    language.name
                        .toLowerCase()
                        .startsWith(
                            inputValue.toLowerCase()
                        )
                )
            );
        } else {
            setDropdownVisible(false);
        }
    }, [inputValue]);
    return (
        <div>
            <h1>ProLanDle</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (
                        !languages.find(
                            (language) =>
                                language.name.toLowerCase() ===
                                inputValue.toLowerCase()
                        )
                    ) {
                        setInputError(
                            'Programming Language Not Found'
                        );
                        return;
                    }
                    setLanguages(
                        languages.filter((language) => {
                            return (
                                language.name.toLowerCase() !==
                                inputValue.toLowerCase()
                            );
                        })
                    );
                    check(inputValue)
                        .then((response) => response.json())
                        .then((data) => {
                            setLanguageCheck([
                                data,
                                ...languageCheck,
                            ]);
                            if (
                                data.name.check ===
                                'correct'
                            ) {
                                setDone(true);
                            }
                        });
                    setInputValue('');
                }}
            >
                <Input
                    hidden={done}
                    placeholder="Type Programming Language..."
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setInputError(null);
                    }}
                    value={inputValue}
                    error={inputError}
                />
                {dropdownVisible &&
                    filteredLanguages?.length > 0 && (
                        <div>
                            {filteredLanguages.map(
                                (language) => (
                                    <div
                                        key={language.name}
                                    >
                                        {language.name}
                                    </div>
                                )
                            )}
                        </div>
                    )}
            </form>
            <table>
                <tbody>
                    {languageCheck.map(
                        ({
                            name,
                            paradigm,
                            typeSystem,
                            translatingMethod,
                            rank,
                            year,
                        }) => {
                            return (
                                <tr key={name.value}>
                                    <td
                                        className={getStyle(
                                            name.check
                                        )}
                                    >
                                        {name.value}
                                    </td>
                                    <td
                                        className={getStyle(
                                            paradigm.check
                                        )}
                                    >
                                        {paradigm.value.join(
                                            ', '
                                        )}
                                    </td>
                                    <td
                                        className={getStyle(
                                            typeSystem.check
                                        )}
                                    >
                                        {typeSystem.value}
                                    </td>
                                    <td
                                        className={getStyle(
                                            translatingMethod.check
                                        )}
                                    >
                                        {
                                            translatingMethod.value
                                        }
                                    </td>
                                    <td
                                        className={getStyle(
                                            rank.check
                                        )}
                                    >
                                        {rank.value}
                                    </td>
                                    <td
                                        className={getStyle(
                                            year.check
                                        )}
                                    >
                                        {year.value}
                                    </td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default App;
