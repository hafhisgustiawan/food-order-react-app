import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountValid, setAmountValid] = useState(true);
  const amountInputRef = useRef();

  const submitEventHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value * 1;

    if (enteredAmount === 0 || enteredAmount < 1) {
      setAmountValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={styles.form} onSubmit={submitEventHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {}
      {!amountValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
