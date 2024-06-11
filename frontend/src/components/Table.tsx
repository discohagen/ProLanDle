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

type Props = {
  languageChecks: LanguageCheck[];
};

function getProgrammingLanguageIcon(language: string) {
  switch (language) {
    case "Python":
      return <SiPython />;
    case "Java":
      return <FaJava />;
    case "C++":
      return <SiCplusplus />;
    case "C":
      return <SiC />;
    case "JavaScript":
      return <SiJavascript />;
    case "C#":
      return <SiCsharp />;
    case "Go":
      return <SiGo />;
    case "TypeScript":
      return <SiTypescript />;
    case "R":
      return <SiR />;
    case "Bash":
      return <FaTerminal />;
    case "PHP":
      return <FaPhp />;
    case "Ruby":
      return <SiRuby />;
    case "Swift":
      return <SiSwift />;
    case "Dart":
      return <SiDart />;
    case "Rust":
      return <SiRust />;
    case "Kotlin":
      return <SiKotlin />;
    case "Scala":
      return <SiScala />;
    case "Perl":
      return <SiPerl />;
    case "Lua":
      return <SiLua />;
    case "ABAP":
      return <SiSap />;
    case "Prolog":
      return <DiProlog />;
    case "CoffeeScript":
      return <SiCoffeescript />;
    default:
      return <span className="text-base">{language}</span>;
  }
}

function getStyle(check: Check | NumericCheck) {
  const styles = ["text-center", "border-[1rem]", "border-[#0d1117]", "w-1/6"];
  if (check === "correct" || check === "equal") {
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
          return (
            <div
              title={value as string}
              className="text-4xl items-center flex justify-center"
            >
              {getProgrammingLanguageIcon(value as string)}
            </div>
          );
        }
        return Array.isArray(value) ? value.join(", ") : value;
    }
  }
  function renderCells(languageCheck: LanguageCheck) {
    return Object.entries(languageCheck).map(([key, { check, value }]) => {
      return (
        <td key={[check, value].join()} className={getStyle(check)}>
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
              <th>Rank</th>
              <th>Year</th>
            </tr>
          )}
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
}
