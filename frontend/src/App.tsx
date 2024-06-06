import { useEffect, useState } from "react";
import { Table } from "./components/Table";
import { Language, LanguageCheck } from "./types/language";
import { Form } from "./components/Form";
import { check } from "./api/api";

const LANGUAGE_CHECKS_KEY = "language_checks";

const savedLanguageChecks = JSON.parse(
  localStorage.getItem(LANGUAGE_CHECKS_KEY) ?? "[]"
) as LanguageCheck[];

function App() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languageChecks, setLanguageChecks] =
    useState<LanguageCheck[]>(savedLanguageChecks);

  useEffect(() => {
    fetch("http://localhost:3000/languages")
      .then(async (response) => (await response.json()) as Language[])
      .then((data) =>
        setLanguages(
          data.filter(
            (language) =>
              !languageChecks.some(
                (check) => check.name.value === language.name
              )
          )
        )
      );
  }, [languageChecks]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_CHECKS_KEY, JSON.stringify(languageChecks));
  }, [languageChecks]);

  function handleFormSubmit(language: string) {
    check(language)
      .then((response) => response.json())
      .then((data) => {
        setLanguageChecks([data, ...languageChecks]);
      });
  }

  return (
    <div className="h-full">
      <h1 className="text-4xl text-center m-10">ProLanDle</h1>
      <Form
        languages={languages}
        setLanguages={setLanguages}
        onSubmit={handleFormSubmit}
        done={languageChecks.some((check) => check.name.check === "correct")}
      />
      <Table languageChecks={languageChecks} />
      <div className="w-3/4 mx-auto">
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
