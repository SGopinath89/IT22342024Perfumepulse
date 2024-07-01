import React from 'react';

const OrderedItems = ({ order }) => {
    return (
        <div>
            {order.orderItems.map((orderItem, index) => (
                <div key={index}>
                    <p>{orderItem.product.name}</p>

                </div>    
            ))}
        </div>
    );
};

export default OrderedItems;