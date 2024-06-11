import { DiProlog } from "react-icons/di";
import { FaJava, FaTerminal, FaPhp } from "react-icons/fa";
import {
  SiPython,
  SiCplusplus,
  SiC,
  SiJavascript,
  SiCsharp,
  SiGo,
  SiTypescript,
  SiR,
  SiRuby,
  SiSwift,
  SiDart,
  SiRust,
  SiKotlin,
  SiScala,
  SiPerl,
  SiLua,
  SiSap,
  SiCoffeescript,
} from "react-icons/si";
import { Check, NumericCheck, LanguageCheck } from "../types/language";
import React from "react";

type Props = {
  languageChecks: LanguageCheck[];
};

type ProgrammingLanguageInfo = {
  icon: React.ReactNode;
  link: string;
};

function getProgrammingLanguageInfo(language: string): ProgrammingLanguageInfo {
  switch (language) {
    case "Python":
      return {
        icon: <SiPython />,
        link: "https://www.python.org/",
      };
    case "Java":
      return {
        icon: <FaJava />,
        link: "https://www.java.com/",
      };
    case "C++":
      return {
        icon: <SiCplusplus />,
        link: "https://en.wikipedia.org/wiki/C%2B%2B",
      };
    case "C":
      return {
        icon: <SiC />,
        link: "https://en.wikipedia.org/wiki/C_(programming_language)",
      };
    case "JavaScript":
      return {
        icon: <SiJavascript />,
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      };
    case "C#":
      return {
        icon: <SiCsharp />,
        link: "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)",
      };
    case "Go":
      return {
        icon: <SiGo />,
        link: "https://go.dev/",
      };
    case "TypeScript":
      return {
        icon: <SiTypescript />,
        link: "https://www.typescriptlang.org/",
      };
    case "R":
      return {
        icon: <SiR />,
        link: "https://www.r-project.org/",
      };
    case "Bash":
      return {
        icon: <FaTerminal />,
        link: "https://en.wikipedia.org/wiki/Bash_(Unix_shell)",
      };
    case "PHP":
      return {
        icon: <FaPhp />,
        link: "https://www.php.net/",
      };
    case "Ruby":
      return {
        icon: <SiRuby />,
        link: "https://www.ruby-lang.org/",
      };
    case "SAS":
      return {
        icon: language,
        link: "https://www.sas.com/",
      };
    case "Swift":
      return {
        icon: <SiSwift />,
        link: "https://www.swift.org/",
      };
    case "Dart":
      return {
        icon: <SiDart />,
        link: "https://dart.dev/",
      };
    case "Rust":
      return {
        icon: <SiRust />,
        link: "https://www.rust-lang.org/",
      };
    case "Kotlin":
      return {
        icon: <SiKotlin />,
        link: "https://kotlinlang.org/",
      };
    case "Scala":
      return {
        icon: <SiScala />,
        link: "https://www.scala-lang.org/",
      };
    case "Assembly":
      return {
        icon: language,
        link: "https://en.wikipedia.org/wiki/Assembly_language",
      };
    case "Perl":
      return {
        icon: <SiPerl />,
        link: "https://www.perl.org/",
      };
    case "Lua":
      return {
        icon: <SiLua />,
        link: "https://www.lua.org/",
      };
    case "Cobol":
      return {
        icon: language,
        link: "https://en.wikipedia.org/wiki/COBOL",
      };
    case "ABAP":
      return {
        icon: <SiSap />,
        link: "https://help.sap.com/doc/abapdocu_751_index_htm/7.51/de-DE/abenabap_overview.htm",
      };
    case "Prolog":
      return {
        icon: <DiProlog />,
        link: "https://www.swi-prolog.org/",
      };
    case "CoffeeScript":
      return {
        icon: <SiCoffeescript />,
        link: "https://coffeescript.org/",
      };
    default:
      return {
        icon: language,
        link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      };
  }
}

function getStyle(key: string, check: Check | NumericCheck) {
  const styles = ["text-center", "border-[1rem]", "border-[#0d1117]", "w-1/6"];
  if (key === "name") {
    styles.push("bg-transparent");
  } else if (check === "correct" || check === "equal") {
    styles.push("bg-green-600");
  } else if (check === "incorrect" || check === "up" || check === "down") {
    styles.push("bg-red-600");
  } else {
    styles.push("bg-orange-600");
  }
  return styles.join(" ");
}

export function Table(props: Props) {
  function renderResult(
    key: string,
    check: Check | NumericCheck,
    value: string | string[] | number,
  ) {
    switch (check) {
      case "up":
        return `${value} ↑`;
      case "down":
        return `${value} ↓`;
      default:
        if (key === "name") {
          const info = getProgrammingLanguageInfo(value as string);
          return (
            <a
              title={value as string}
              className={`${typeof info.icon === "string" ? "text-2xl" : "text-4xl"} items-center flex justify-center`}
              href={info.link}
              target="_blank"
            >
              {info.icon}
            </a>
          );
        }
        return Array.isArray(value) ? value.join(", ") : value;
    }
  }
  function renderCells(languageCheck: LanguageCheck) {
    return Object.entries(languageCheck).map(([key, { check, value }]) => {
      return (
        <td key={[check, value].join()} className={getStyle(key, check)}>
          {renderResult(key, check, value)}
        </td>
      );
    });
  }
  function renderRows() {
    return props.languageChecks.map((languageCheck, idx) => {
      return (
        <tr key={idx} className="h-16 w-3/4">
          {renderCells(languageCheck)}
        </tr>
      );
    });
  }

  return (
    <div className="flex justify-center">
      <table className="w-3/4">
        <tbody>
          {props.languageChecks.length > 0 && (
            <tr key="headings">
              <th>Language</th>
              <th>Paradigms</th>
              <th>Typing</th>
              <th>Translating</th>
              <th>
                <a
                  href="https://spectrum.ieee.org/the-top-programming-languages-2023"
                  target="_blank"
                >
                  Rank<sup className="p-1">i</sup>
                </a>
              </th>
              <th>Year</th>
            </tr>
          )}
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
}
