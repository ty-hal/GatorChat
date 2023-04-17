/// <reference types="react" />
export type Item<T> = T & {
    [key: string]: any;
};
export interface ResultsProps<T> {
    results: Item<T>[];
    onClick: Function;
    highlightedItem: number;
    setHighlightedItem: Function;
    setSearchString: Function;
    formatResult?: Function;
    showIcon: boolean;
    maxResults: number;
    resultStringKeyName: string;
    showNoResultsFlag?: boolean;
    showNoResultsText?: string;
}
export default function Results<T>({ results, onClick, setSearchString, showIcon, maxResults, resultStringKeyName, highlightedItem, setHighlightedItem, formatResult, showNoResultsFlag, showNoResultsText }: ResultsProps<T>): JSX.Element | null;
