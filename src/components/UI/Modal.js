import { Fragment } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onToggleCart}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(
        <Backdrop onToggleCart={props.onToggleCart} />,
        document.getElementById('overlays')
      )}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('overlays')
      )}
    </Fragment>
  );
};

export default Modal;
