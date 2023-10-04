import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [animateButton, setAnimateButton] = useState(false);

  const countItem = ctx.items.reduce(
    (currentNum, item) => currentNum + item.amount,
    0
  );

  const btnClasses = `${styles.button} ${animateButton && styles.bump}`;

  const { items } = ctx;

  useEffect(() => {
    if (items.length === 0) return;
    setAnimateButton(true);

    const timer = setTimeout(() => {
      setAnimateButton(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{countItem}</span>
    </button>
  );
};

export default HeaderCartButton;
