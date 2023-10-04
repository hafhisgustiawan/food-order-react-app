import styles from './Cart.module.css';

import Modal from '../UI/Modal';

const Cart = (props) => {
  const cartItems = (
    <ul>
      {[{ id: 'c1', name: 'Sushi', amount: 2, price: 12.99 }].map((el) => {
        return <li key={el.id}>{el.name}</li>;
      })}
    </ul>
  );

  return (
    <Modal onToggleCart={props.onToggleCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onToggleCart} className={styles['button--alt']}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
