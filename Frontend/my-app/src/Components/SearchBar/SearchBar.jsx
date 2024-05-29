import { useState } from "react";
//import { FaSearch } from "react-icons/fa";
import search from '../Assests/search.png';
import filter from '../Assests/settings.png';

import "./SearchBar.css";
import { Link } from "react-router-dom";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    //fetch("https://jsonplaceholder.typicode.com/users")
    fetch("http://localhost:5000/api/v1/products")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="search-filter">
        <div className="input-wrapper">
          <img src={search} alt="" />
          <input
            placeholder="Type to search..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        <div className="filter">
         <Link to={'/filterproducts'}><div class="tooltip-container-filter"> <img src={filter} alt="" /></div></Link>
        </div>
    </div>
  );
};
