import { useCallback, useEffect, useMemo, useState } from "react";
import { Table } from "./components/Table";
import { Language, LanguageCheck } from "./types/language";
import { check, getLanguages, getNewestAnswerRef } from "./api/api";
import { GuessBox } from "./components/GuessBox";

const LANGUAGE_CHECKS_KEY = "language_checks";
const NEWEST_ANSWER_REF = "newest_answer_ref";

const savedLanguageChecks = JSON.parse(
  localStorage.getItem(LANGUAGE_CHECKS_KEY) ?? "[]",
) as LanguageCheck[];

const savedNewestAnswerRef = Number.parseInt(
  localStorage.getItem(NEWEST_ANSWER_REF) ?? "0",
);

function App() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languageChecks, setLanguageChecks] = useState(savedLanguageChecks);
  const [newestAnswerRef, setNewestAnswerRef] = useState(savedNewestAnswerRef);
  const [guessBoxInput, setGuessBoxInput] = useState("");

  const finished = useMemo(
    () => languageChecks.some((check) => check.name.check === "correct"),
    [languageChecks],
  );

  useEffect(() => {
    getLanguages().then((data) =>
      setLanguages(
        data.filter(
          (language) =>
            !languageChecks.some((check) => check.name.value === language.name),
        ),
      ),
    );
  }, [languageChecks]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_CHECKS_KEY, JSON.stringify(languageChecks));
  }, [languageChecks]);

  useEffect(() => {
    if (newestAnswerRef !== savedNewestAnswerRef) {
      setLanguageChecks([]);
      localStorage.setItem(NEWEST_ANSWER_REF, newestAnswerRef.toString());
    }
  }, [newestAnswerRef]);

  useEffect(() => {
    getNewestAnswerRef().then((data) => setNewestAnswerRef(data.id));
  }, []);

  const handleLanguageSelect = useCallback(
    async (language: string) => {
      setLanguages(
        languages.filter((language) => {
          return language.name.toLowerCase() !== guessBoxInput.toLowerCase();
        }),
      );

      const ref = await getNewestAnswerRef();
      if (ref.id !== newestAnswerRef) {
        setNewestAnswerRef(ref.id);
        return;
      }

      check(language)
        .then((response) => response.json())
        .then((data) => {
          setLanguageChecks([data, ...languageChecks]);
        });

      setGuessBoxInput("");
    },
    [guessBoxInput, languages, languageChecks, newestAnswerRef],
  );

  return (
    <div className="flex flex-col h-full p-10">
      <h1 className="text-4xl text-center mb-5">ProLanDle</h1>
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
