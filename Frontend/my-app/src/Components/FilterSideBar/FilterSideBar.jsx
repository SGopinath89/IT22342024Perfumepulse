import React from 'react';
import './FilterSideBar.css';

const FilterSideBar = ({ handleChange, filters }) => {
    return (
        <div className="filter-sidebar">
            <h3>Filter Products</h3>
            <div className="filter-group">
                <label>Category:</label>
                <select name="category" value={filters.category} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="bloombliss">Bloom Bliss</option>
                    <option value="woodlandwonders">Woodland Wonders</option>
                    <option value="citruscharms">Citrus Charms</option>
                </select>
            </div>
            <div className="filter-group">
                <label>Brand:</label>
                <select name="brand" value={filters.brand} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="Chanel">Chanel</option>
                    <option value="Dior">Dior</option>
                    <option value="Gucci">Gucci</option>
                    <option value="Calvin Klein">Calvin Klein</option>
                    <option value="Tom Ford">Tom Ford</option>
                    <option value="Dolce & Gabbana">Dolce & Gabbana</option>
                    <option value="Versace">Versace</option>
                    <option value="Marc Jacobs">Marc Jacobs</option>
                    <option value="Viktor & Rolf">Viktor & Rolf</option>
                    <option value="Jo Malone">Jo Malone</option>

                </select>
            </div>
            <div className="filter-group">
                <label>Min Price:</label>
                <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleChange}
                    placeholder="0"
                />
            </div>
            <div className="filter-group">
                <label>Max Price:</label>
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleChange}
                    placeholder="0"
                />
            </div>
        </div>
    );
};

export default FilterSideBar;
