import { useContext } from 'react';

import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);

  const countItem = ctx.items.reduce(
    (currentNum, item) => currentNum + item.amount,
    0
  );

  return (
    <button onClick={props.onClick} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{countItem}</span>
    </button>
  );
};

export default HeaderCartButton;
