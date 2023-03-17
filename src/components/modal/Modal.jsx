import { createPortal } from "react-dom";
import { ModalOverlay } from "../modal-overlay/ModalOverlay";
import ModalStyle from "../modal/modal.module.css";
import PropTypes from "prop-types";
import { useEffect } from "react";

const modalElement = document.querySelector("#modal");

export const Modal = (props) => {
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      props.onClose();
    }
  });

  return createPortal(
    <>
      <ModalOverlay onClick={props.onClose} />
      <div className={ModalStyle.background}>
        <div className={ModalStyle.modal}>
          <svg
            onClick={props.onClose}
            className={ModalStyle.svg}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" x2="100" y1="0" y2="100" />
            <line x1="0" x2="100" y1="100" y2="0" />
          </svg>
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
