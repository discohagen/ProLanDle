import { useEffect, useState } from 'react';
import { Input } from './components/Input';
import { Table } from './components/Table';
import { languageCheck } from './types/languageCheck';

type Language = {
    name: string;
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

function App() {
    const [languages, setLanguages] = useState<Language[]>(
        []
    );
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState<
        string | null
    >(null);
    const [languageChecks, setLanguageChecks] = useState<
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
    }, [inputValue, languages]);
    return (
        <div>
            <h1 className="text-4xl text-center m-10">
                ProLanDle
            </h1>
            <form
                className="flex flex-col items-center"
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
                            setLanguageChecks([
                                data,
                                ...languageChecks,
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
                        <div className="w-3/4">
                            {filteredLanguages.map(
                                (language) => (
                                    <div
                                        className="mx-2"
                                        key={language.name}
                                        onClick={() => {
                                            setInputValue(
                                                language.name
                                            );
                                            setDropdownVisible(
                                                false
                                            );
                                        }}
                                    >
                                        {language.name}
                                    </div>
                                )
                            )}
                        </div>
                    )}
            </form>
            <Table languageChecks={languageChecks} />
        </div>
    );
}

export default App;
