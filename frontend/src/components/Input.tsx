import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'input'> & {
    error?: string | null;
};

export function Input(props: Props) {
    return (
        <input
            spellCheck={false}
            {...props}
            className={`rounded-lg p-2 w-3/4 dark:bg-gray-800 bg-gray-200 ${
                props.error
                    ? 'border-2 border-red-800 outline-none '
                    : ''
            }`}
        />
    );
}
