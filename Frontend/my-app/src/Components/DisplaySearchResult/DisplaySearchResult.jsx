import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from '../Item/Item'; 

const DisplaySearchResult = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try{
                
                const response = await axios.get(`http://localhost:5000/api/v1/products/search?q=${searchQuery}`);
                setSearchResults(response.data); // Update search results state with the fetched data
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (searchQuery !== '') {
            fetchSearchResults();
        } else {
            setSearchResults([]); // Clear search results if search query is empty
        }
    }, [searchQuery]); // Trigger effect when searchQuery changes

    return (
        <div>
            {/* Render search results if searchResult is defined */}
            {searchResults && searchResults.map((product) => (
                <Item
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                brand={product.brand}
                price={product.price}
                />
            ))}
        </div>
    );
};

export default DisplaySearchResult;