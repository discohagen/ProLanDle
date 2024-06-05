import { useEffect, useState } from 'react';
import { Table } from './components/Table';
import { Language, languageCheck } from './types/language';
import { Form } from './components/Form';
import { check } from './api/api';

function App() {
    const [languages, setLanguages] = useState<Language[]>(
        []
    );
    const [languageChecks, setLanguageChecks] = useState<
        languageCheck[]
    >([]);
    const [done, setDone] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/languages')
            .then((response) => response.json())
            .then((data) => setLanguages(data));
    }, []);

    function handleFormSubmit(language: string) {
        check(language)
            .then((response) => response.json())
            .then((data) => {
                setLanguageChecks([
                    data,
                    ...languageChecks,
                ]);
                if (data.name.check === 'correct') {
                    setDone(true);
                }
            });
    }

    return (
        <div className="h-full">
            <h1 className="text-4xl text-center m-10">
                ProLanDle
            </h1>
            <Form
                languages={languages}
                setLanguages={setLanguages}
                onSubmit={handleFormSubmit}
                done={done}
            />
            <Table languageChecks={languageChecks} />
            <div className="w-3/4 mx-auto">
                <p>
                    <b>ProLanDle</b> (noun): <br />
                    <i>
                        Pronunciation: /ˈprōˌlan-dəl/
                    </i>{' '}
                    <br />
                    <b>Definition:</b> ProLanDle [
                    <i>
                        abbr. for{' '}
                        <b>Programming-Language-dle</b>
                    </i>
                    ] is an interactive web application that
                    emulates the popular game Wordle but
                    with a unique twist tailored for
                    programming enthusiasts. In ProLanDle,
                    users are challenged to guess the name
                    of a programming language. Each guess
                    provides feedback, guiding the player
                    towards the correct answer through a
                    process of elimination and logical
                    deduction.
                </p>
            </div>
        </div>
    );
}

export default App;
