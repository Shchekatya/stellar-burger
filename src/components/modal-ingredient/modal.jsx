import { createPortal } from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import ModalStyle from "../modal-ingredient/modal.module.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalElement = document.querySelector("#modal");

export const Modal = (props) => {
  useEffect(() => {
    function closeByEscape(e) {
      if(e.key === 'Escape') {
        props.onClose();
      }
    }
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }

  }, []) 

  return createPortal(
    <>
      <ModalOverlay onClick={props.onClose} />
      <div className={ModalStyle.background}>
        <div className={ModalStyle.modal}>
        <div className={ModalStyle.close}>
        <CloseIcon type="primary" onClick={props.onClose} />
        </div>
          <div className={ModalStyle.txt}>{props.children}</div>
        </div>
      </div>
    </>,
    modalElement
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
