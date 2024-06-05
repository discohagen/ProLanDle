import { ComponentPropsWithoutRef } from 'react';
import {
    Check,
    NumericCheck,
    languageCheck,
} from '../types/languageCheck';

type Props = ComponentPropsWithoutRef<'table'> & {
    languageChecks: languageCheck[];
    error?: string | null;
};

function getStyle(check: Check | NumericCheck) {
    const styles = [
        'text-center',
        'border-[1rem]',
        'border-[#0d1117]',
        'w-1/6',
    ];
    if (check === 'correct' || check === 'equal') {
        styles.push('bg-green-600');
    } else if (
        check === 'incorrect' ||
        check === 'up' ||
        check === 'down'
    ) {
        styles.push('bg-red-600');
    } else {
        styles.push('bg-orange-600');
    }
    return styles.join(' ');
}

export function Table(props: Props) {
    return (
        <div className="flex justify-center my-10">
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

                    {props.languageChecks.map(
                        (languageCheck) => {
                            return (
                                <tr
                                    key={
                                        languageCheck.name
                                            .value
                                    }
                                    className="h-16 w-3/4"
                                >
                                    {Object.entries(
                                        languageCheck
                                    ).map(([, field]) => {
                                        const {
                                            check,
                                            value,
                                        } = field as {
                                            check:
                                                | Check
                                                | NumericCheck;
                                            value:
                                                | string
                                                | string[]
                                                | number;
                                        };
                                        return (
                                            <td
                                                key={[
                                                    check,
                                                    value,
                                                ].join()}
                                                className={getStyle(
                                                    check
                                                )}
                                            >
                                                {check ===
                                                    'up' &&
                                                    `${value} ↑`}
                                                {check ===
                                                    'down' &&
                                                    `${value} ↓`}
                                                {check !==
                                                    'up' &&
                                                    check !==
                                                        'down' &&
                                                    (Array.isArray(
                                                        value
                                                    )
                                                        ? value.join(
                                                              ', '
                                                          )
                                                        : value)}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
}
