import React, {useEffect, useState} from 'react'
import FilterSideBar from '../Components/FilterSideBar/FilterSideBar'
import Item from '../Components/Item/Item'
import Products from '../Components/Products/Products';


const FilterProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [all_product, setAll_Product] = useState([]);

      useEffect(() => {
        fetch("http://localhost:5000/api/v1/products/")
         .then((response) => response.json())
         .then((data) => setAll_Product(data));
      }, []);  

      //------------ Radio Filtering --------------
      const handleChange = (event) => {
        setSelectedCategory(event.target.value);
      };

      function filteredData(selected) {
        let filteredProducts = all_product;



        //Appling selected filter
        if (selected) {
            filteredProducts = filteredProducts.filter(
                ({ category, brand, price }) =>
                    category === selected ||
                    brand === selected ||
                    price === selected
            );
        }

        return filteredProducts.map(
            (item, i) => (
                <Item
                 key={i}
                 id={item.id}
                 name={item.name}
                 image={item.image}
                 price={item.price}
                 brand={item.brand}
                 />
            )
        );
      }

      const result = filteredData(selectedCategory);

     return (
        <div classname='displayproducts' >
            <FilterSideBar handleChange={handleChange} />
            <Products result={result}/>
        </div>
    ) 
}

export default FilterProducts