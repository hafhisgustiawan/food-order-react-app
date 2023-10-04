import { useReducer } from 'react';

import CartContext from './cart-context';

const initialCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const total = state.totalAmount + action.item.price * action.item.amount;

    const cartItemExistingIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items[cartItemExistingIndex * 1];

    let updatedItems = state.items;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems[cartItemExistingIndex] = updatedItem;
      // updatedItems = state.items.concat(action.item);
    } else {
      //concat ini mirip push, tapi dia tidak mempengaruhi array ref nya, cek dokumentasi
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: total };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingcartIntemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingcartIntemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems = state.items;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems[existingcartIntemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return initialCart; //optional
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialCart);

  const addItem = (item) => {
    dispatchCart({ type: 'ADD_ITEM', item });
  };

  const removeItem = (id) => {
    dispatchCart({ type: 'REMOVE_ITEM', id });
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
