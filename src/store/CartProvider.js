import { useReducer } from 'react';

import CartContext from './cart-context';

const initialCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = state.items.concat(action.item);
    const total = state.totalAmount + action.item.price * action.item.amount;

    return { items: updatedItems, totalAmount: total };
  }
  return initialCart; //optional
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialCart);

  const addItem = (item) => {
    dispatchCart({ type: 'ADD_ITEM', item });
  };

  const removeItem = (id) => {
    dispatchCart({ type: 'ADD_ITEM', id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
