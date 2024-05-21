import React, { createContext, useEffect } from "react";
import { useState } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 0; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [orderItems, setOrderItems] = useState([]); // State to store order items

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/products/allproducts')
            .then(response => {
                setAll_Product(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const addToCart = (itemId) => {
        // Add the item to the cart
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        // Add the item to the orderItems state
        const orderItem = { product: itemId, quantity: cartItems[itemId] + 1 };
        setOrderItems(prevItems => [...prevItems, orderItem]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        // Remove the item from the orderItems state
        setOrderItems((prevItems) =>
            prevItems.filter((item) => item.product !== itemId)
        );
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = all_product.find((product) => product.id === itemId);
                if (itemInfo && itemInfo.price) {
                    totalAmount += cartItems[itemId] * itemInfo.price;
                } else {
                    console.error(`Product with ID ${itemId} not found or has no price.`);
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        orderItems,
        addToCart,
        removeFromCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
