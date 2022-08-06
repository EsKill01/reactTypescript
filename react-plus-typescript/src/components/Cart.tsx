import React, {createRef} from 'react';
import CartCSS from './Cart.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import { AppStateContext } from './AppState';




interface Props {};

interface State {
    isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
    #conteinerRef: React.RefObject<HTMLDivElement>;
    constructor(props: Props){
        super(props);
        this.state = {
            isOpen: false,
        }
    
        this.#conteinerRef = createRef();
    }

handlerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState((prevState) => ({isOpen: !prevState.isOpen}));
    
    console.log(e.target);
    if ((e.target as HTMLElement).nodeName === 'SPAN'){
        console.log(e.target);
    }
}

handleOutsideClick = (e: MouseEvent) => {
     if (this.#conteinerRef.current && !this.#conteinerRef.current.contains(e.target as Node)){
            this.setState({ isOpen: false });
        }
}

componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
}

componentWillUnmount() {
    document.addEventListener('mousedown', this.handleOutsideClick)
}

render() {
    return (
        <AppStateContext.Consumer>{(state) => {
            const itemsCount = state.cart.items.reduce((sum, item) => {
                return sum + item.quantity;
            }, 0)
            return (
            <div className={CartCSS.cartContainer} ref={this.#conteinerRef}>
            <button className={CartCSS.button} type="button" onClick={this.handlerClick} >
                <FiShoppingCart />
                <span>{itemsCount} pizza(s)</span>
            </button>
            <div className={CartCSS.cartDropDown} style={{
                display: this.state.isOpen ? 'block' : 'none',

            }}>
                <ul>
                    {

                        state.cart.items.map(item => {
                            return <li key={item.id}>{item.name} &times; {item.quantity}</li>
                        })
                    }
                </ul>
            </div>
        </div>)

        }}</AppStateContext.Consumer>
        
    );
}
}

export default Cart;