import React from 'react';
import { Pizza } from '../types';
import {  withAddToCart, WithAddToCartProps } from './AddToCart';
import { useStateDispatch  } from './AppState';
import SpecialOfferCSS from './SpecialOffer.module.css';


interface Props  {
    pizza: Pizza
}

/*const SpecialOffer: React.FC<Props>  = ({pizza, addToCart}) =>{
  const dispatch = useStateDispatch();
  const handleAddToCartClick = () => {
      addToCart({id: pizza.id, name: pizza.name, price: pizza.price});
  };
    return (
        <div className={SpecialOfferCSS.container}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <button type="button" onClick={handleAddToCartClick}>Add to Cart</button>
        </div>
    )
};*/

const SpecialOffer: React.FC<Props>  = ({pizza}) =>{

    return (
        <div className={SpecialOfferCSS.container}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <WithAddToCartProps>
                
                {
                    
                    ({addToCart}) =>{
                        return(
                            <button type="button" onClick={() => addToCart({id: pizza.id, name: pizza.name, price: pizza.price})}>Add to Cart</button>
                        )
                    }
                }
            </WithAddToCartProps>
            
        </div>
    )
};

export default SpecialOffer;