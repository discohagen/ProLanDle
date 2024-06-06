import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

type Props = ComponentPropsWithoutRef<"input"> & {
  error?: string | null;
  value: string;
  options: string[];
  onOptionSelect: (option: string) => void;
};

export function GuessBox({
  options,
  value,
  onOptionSelect: onOptionClick,
  onChange,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (filteredOptions.length > 0) {
      setSelectedOption(0);
    } else {
      setSelectedOption(null);
    }
  }, [filteredOptions]);

  useEffect(() => {
    const onClick = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener("click", onClick);
    } else {
      document.removeEventListener("click", onClick);
    }

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [dropdownVisible]);

  useEffect(() => {
    if (value.length === 0) {
      setDropdownVisible(false);
    }
  }, [value]);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target.value.length > 0) {
      setDropdownVisible(true);
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().startsWith(evt.target.value.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions([]);
      setDropdownVisible(false);
    }

    if (onChange) {
      onChange(evt);
    }
  }

  function handleKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
    switch (evt.key) {
      case "Escape":
        evt.preventDefault();
        setDropdownVisible(false);
        break;

      case "Enter":
        evt.preventDefault();

        if (selectedOption !== null) {
          onOptionClick(filteredOptions[selectedOption]);
          setDropdownVisible(false);
        }

        break;
      case "ArrowDown":
        evt.preventDefault();

        setSelectedOption((prev) => {
          if (prev === null || prev === filteredOptions.length - 1) {
            return 0;
          }

          return prev + 1;
        });

        break;
      case "ArrowUp":
        evt.preventDefault();

        setSelectedOption((prev) => {
          if (prev === null || prev === 0) {
            return filteredOptions.length - 1;
          }

          return prev - 1;
        });

        break;
    }
  }

  function renderDropdown() {
    if (dropdownVisible && filteredOptions?.length > 0) {
      return (
        <div className="flex flex-col w-full bg-gray-800 rounded-lg mt-2 overflow-hidden absolute">
          {filteredOptions.map((option, idx) => (
            <button
              className={`p-2 text-left hover:bg-gray-700 ${
                selectedOption === idx ? "bg-gray-700" : ""
              }`}
              key={option}
              onClick={() => {
                onOptionClick(option);
                setDropdownVisible(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }
  }

  return (
    <div onKeyDown={handleKeyDown} ref={ref} className="w-3/4 relative">
      <input
        spellCheck={false}
        {...rest}
        value={value}
        onChange={handleChange}
        className={`rounded-lg p-2 w-full bg-gray-800`}
        onFocus={() => value.length > 0 && setDropdownVisible(true)}
      />

      {renderDropdown()}
    </div>
  );
}
