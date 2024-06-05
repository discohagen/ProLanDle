import React, { useEffect, useState } from 'react';
import { Language } from '../types/language';
import { Input } from './Input';

type Props = {
    languages: Language[];
    setLanguages: (languages: Language[]) => void;
    onSubmit: (language: string) => void;
    done: boolean;
};

export function Form({ languages, ...props }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState<
        string | null
    >(null);
    const [dropdownVisible, setDropdownVisible] =
        useState(false);
    const [filteredLanguages, setfilteredLanguages] =
        useState<Language[]>([]);

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

    function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();
        if (
            !languages.find(
                (language) =>
                    language.name.toLowerCase() ===
                    inputValue.toLowerCase()
            )
        ) {
            setInputError('Programming Language Not Found');
            return;
        }
        props.setLanguages(
            languages.filter((language) => {
                return (
                    language.name.toLowerCase() !==
                    inputValue.toLowerCase()
                );
            })
        );
        props.onSubmit(inputValue);
        setInputValue('');
    }
    function renderDropdown() {
        if (
            dropdownVisible &&
            filteredLanguages?.length > 0
        ) {
            return (
                <div className="w-3/4">
                    {filteredLanguages.map((language) => (
                        <div
                            className="mx-2"
                            key={language.name}
                            onClick={() => {
                                setInputValue(
                                    language.name
                                );
                                setDropdownVisible(false);
                            }}
                        >
                            {language.name}
                        </div>
                    ))}
                </div>
            );
        }
    }

    return (
        <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit}
        >
            <Input
                hidden={props.done}
                placeholder="Type Programming Language..."
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setInputError(null);
                }}
                value={inputValue}
                error={inputError}
            />
            {renderDropdown()}
        </form>
    );
}
