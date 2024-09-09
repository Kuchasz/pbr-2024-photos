"use client";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface AutocompleteProps {
    options: Option[];
}

export default function BetterAutocomplete({ options }: AutocompleteProps) {
    const [query, setQuery] = useState('')

    const router = useRouter();

    const filteredOptions =
        query === ''
            ? []
            : options.filter((option) => {
                return option.label.toLowerCase().includes(query.toLowerCase())
            }).slice(0, 10)

    return (
        <div className="w-full flex justify-center text-gray-600 pt-20">
            <Combobox onChange={(option: Option) => void router.push(`/${(option).value}`)} onClose={() => setQuery('')}>
                <div className="relative w-full md:w-96">
                    <ComboboxInput
                        className={clsx(
                            // 'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
                            // 'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                            "bg-white w-full h-16 px-5 pr-10 rounded-full text-sm focus:outline-none"
                        )}
                        placeholder='Your team name...'
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <button type="submit" className="absolute right-0 top-0 mt-6 mr-4">
                        <svg className="h-4 w-4 fill-current" x="0px" y="0px" viewBox="0 0 56.966 56.966" width="512px" height="512px">
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        'w-[var(--input-width)] text-black rounded-xl border border-white bg-gray-100 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                >
                    {filteredOptions.map((option) => (
                        <ComboboxOption
                            key={option.value}
                            value={option}
                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white"
                        >
                            <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                            <div className="text-sm/6 text-black">{option.label}</div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </div >
    )
}