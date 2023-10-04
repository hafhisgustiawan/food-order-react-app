import { useContext } from 'react';

import styles from './Cart.module.css';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {ctx.items.map((el) => {
        return (
          <CartItem
            key={el.id}
            price={el.price}
            name={el.name}
            amount={el.amount}
            onRemove={cartItemRemoveHandler.bind(null, el.id)}
            onAdd={cartItemAddHandler.bind(null, el)}
          />
        );
      })}
      {/*bind disini berfungsi untuk mengikat function agar ketika dipanggil nantinya tidak perlu ada parameter lagi, seperti inisialisasi parameter sebelum pemanggilan, mantap! */}
    </ul>
  );

  return (
    <Modal onToggleCart={props.onToggleCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onToggleCart} className={styles['button--alt']}>
          Close
        </button>
        {ctx.items.length > 0 && (
          <button className={styles.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
