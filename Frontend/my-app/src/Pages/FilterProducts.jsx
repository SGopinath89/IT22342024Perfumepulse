import React, { useEffect, useState } from 'react';
import FilterSideBar from '../Components/FilterSideBar/FilterSideBar';
import Item from '../Components/Item/Item';
import './CSS/FilterProducts.css';

const FilterProducts = () => {
    const [filters, setFilters] = useState({ category: '', brand: '', minPrice: '', maxPrice: '' });
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/products/")
            .then((response) => response.json())
            .then((data) => setAllProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const filteredData = () => {
        return allProducts.filter(product => {
            const matchCategory = filters.category ? product.category === filters.category : true;
            const matchBrand = filters.brand ? product.brand === filters.brand : true;
            const matchMinPrice = filters.minPrice ? product.price >= filters.minPrice : true;
            const matchMaxPrice = filters.maxPrice ? product.price <= filters.maxPrice : true;
            return matchCategory && matchBrand && matchMinPrice && matchMaxPrice;
        });
    };

    const result = filteredData().map((item, i) => (
        <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
            brand={item.brand}
        />
    ));

    return (
        <div className='displayproducts'>
            <FilterSideBar handleChange={handleChange} filters={filters} />
            <div className="products-container">
                {result}
            </div>
        </div>
    );
};

export default FilterProducts;
