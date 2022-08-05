import React from 'react';
import { Pizza } from '../types';


interface Props {
    pizza: Pizza
}

const SpecialOffer: React.FC<Props>  = ({pizza}) =>{
    return (
        <div>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <button type="button" onClick={handleAddToCartClick}>Add to Cart</button>
        </div>
    )
};

export default SpecialOffer;