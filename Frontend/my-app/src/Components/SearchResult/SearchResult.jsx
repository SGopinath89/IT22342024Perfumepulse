//import "./SearchResult.css";

export const SearchResult = ({ result, onClick }) => {
  return (
    <div
      className="search-result"
      onClick={() => onClick(result.id)}
    >
      {result.name}
    </div>
  );
};
  