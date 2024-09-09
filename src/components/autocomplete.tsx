"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface AutocompleteProps {
    options: Option[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options }) => {
    const [query, setQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    // Filter options based on query
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length > 0) {
            const filtered = options.filter(option =>
                option.label.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered.slice(0, 10));
            setIsDropdownOpen(true);
        } else {
            setFilteredOptions([]);
            setIsDropdownOpen(false);
        }
        
        setQuery(value);
    };

    // Handle selection of an option
    const handleOptionClick = (option: Option) => {
        void router.push(`/${option.value}`);
    };

    return (
        <div className="relative text-gray-600">
            <input value={query}
                onChange={handleInputChange} type="search" name="serch" placeholder="Search" className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"></input>
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                <svg className="h-4 w-4 fill-current" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" width="512px" height="512px">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
            </button>
            {isDropdownOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {filteredOptions.length === 0 ? (
                        <li className="p-2 text-gray-500">No options found</li>
                    ) : (
                        filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-orange-500 hover:text-white cursor-pointer"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
