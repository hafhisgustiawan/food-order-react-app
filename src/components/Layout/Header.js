import React from 'react';
import mealsImg from '../../assets/meals.jpg';

import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onToggleCart} />
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImg} alt="" />
      </div>
    </React.Fragment>
  );
};

export default Header;
