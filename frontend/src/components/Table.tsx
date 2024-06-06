import { Check, NumericCheck, LanguageCheck } from "../types/language";

type Props = {
  languageChecks: LanguageCheck[];
};

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
    check: Check | NumericCheck,
    value: string | string[] | number,
  ) {
    switch (check) {
      case "up":
        return `${value} ↑`;
      case "down":
        return `${value} ↓`;
      default:
        return Array.isArray(value) ? value.join(", ") : value;
    }
  }
  function renderCells(languageCheck: LanguageCheck) {
    return Object.values(languageCheck).map(({ check, value }) => {
      return (
        <td key={[check, value].join()} className={getStyle(check)}>
          {renderResult(check, value)}
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
