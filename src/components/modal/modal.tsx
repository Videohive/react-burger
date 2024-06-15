import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import { TModal } from '../../utils/types';

const modalRoot = document.getElementById("modal") as HTMLElement

const Modal = (props: TModal) => {
  const { title, onClose, children } = props;

  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeModal);

    return () => {
      document.removeEventListener("keydown", closeModal);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={style.modal}>
        <div className="p-10 pb-15">
          <div className={style.header}>
            <div className={style.title}>
              {title && <p className="text text_type_main-large">{title}</p>}
            </div>
            <div className={style.close}>
              <CloseIcon type="primary" onClick={onClose} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;

