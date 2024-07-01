import "./SearchResultsList.css";
import { SearchResult } from "../SearchResult/SearchResult";

export const SearchResultsList = ({ results, onClick }) => {
  return (
    <div className="results-list">
    {results.map(result => (
      <SearchResult key={result.id} result={result} onClick={onClick} />
    ))}
  </div>
  );
};