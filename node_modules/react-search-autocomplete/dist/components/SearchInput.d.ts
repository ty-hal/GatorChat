import { ChangeEventHandler, FocusEventHandler } from 'react';
interface SearchInputProps {
    searchString: string;
    setSearchString: ChangeEventHandler<HTMLInputElement>;
    setHighlightedItem: Function;
    eraseResults: Function;
    autoFocus: boolean;
    onFocus: FocusEventHandler<HTMLInputElement>;
    onClear: Function;
    placeholder: string;
    showIcon: boolean;
    showClear: boolean;
    maxLength: number;
}
export default function SearchInput({ searchString, setSearchString, setHighlightedItem, eraseResults, autoFocus, onFocus, onClear, placeholder, showIcon, showClear, maxLength }: SearchInputProps): JSX.Element;
export {};
