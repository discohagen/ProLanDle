import { useCallback, useEffect, useMemo, useState } from "react";
import { Table } from "./components/Table";
import { Language, LanguageCheck } from "./types/language";
import { check } from "./api/api";
import { GuessBox } from "./components/GuessBox";

const LANGUAGE_CHECKS_KEY = "language_checks";

const savedLanguageChecks = JSON.parse(
  localStorage.getItem(LANGUAGE_CHECKS_KEY) ?? "[]",
) as LanguageCheck[];

function App() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languageChecks, setLanguageChecks] =
    useState<LanguageCheck[]>(savedLanguageChecks);

  const [guessBoxInput, setGuessBoxInput] = useState("");

  const finished = useMemo(
    () => languageChecks.some((check) => check.name.check === "correct"),
    [languageChecks],
  );

  useEffect(() => {
    fetch("http://localhost:3000/languages")
      .then(async (response) => (await response.json()) as Language[])
      .then((data) =>
        setLanguages(
          data.filter(
            (language) =>
              !languageChecks.some(
                (check) => check.name.value === language.name,
              ),
          ),
        ),
      );
  }, [languageChecks]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_CHECKS_KEY, JSON.stringify(languageChecks));
  }, [languageChecks]);

  const handleLanguageSelect = useCallback(
    (language: string) => {
      setLanguages(
        languages.filter((language) => {
          return language.name.toLowerCase() !== guessBoxInput.toLowerCase();
        }),
      );

      check(language)
        .then((response) => response.json())
        .then((data) => {
          setLanguageChecks([data, ...languageChecks]);
        });

      setGuessBoxInput("");
    },
    [guessBoxInput, languages, languageChecks],
  );

  return (
    <div className="flex flex-col h-full p-10">
      <h1 className="text-4xl text-center">ProLanDle</h1>
      <div className="flex flex-col gap-14">
        <div className="flex flex-col items-center">
          <GuessBox
            hidden={finished}
            placeholder="Type Programming Language..."
            onChange={(e) => setGuessBoxInput(e.target.value)}
            value={guessBoxInput}
            options={languages.map((language) => language.name)}
            onOptionSelect={(option) => handleLanguageSelect(option)}
          />
        </div>

        <Table languageChecks={languageChecks} />
      </div>
      <div className="w-3/4 mx-auto mt-auto">
        <p>
          <b>ProLanDle</b> (noun): <br />
          <i>Pronunciation: /ˈprōˌlan-dəl/</i> <br />
          <b>Definition:</b> ProLanDle [
          <i>
            abbr. for <b>Programming-Language-dle</b>
          </i>
          ] is an interactive web application that emulates the popular game
          Wordle but with a unique twist tailored for programming enthusiasts.
          In ProLanDle, users are challenged to guess the name of a programming
          language. Each guess provides feedback, guiding the player towards the
          correct answer through a process of elimination and logical deduction.
        </p>
      </div>
    </div>
  );
}

export default App;
