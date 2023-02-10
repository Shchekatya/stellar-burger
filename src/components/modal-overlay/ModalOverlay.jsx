import ModalOverStyle from "../modal-overlay/modal-overlay.module.css";


const modalElement = document.querySelector("#modal");

export const ModalOverlay = (props) => {
  return (
    <div className={ModalOverStyle.background} onClick={props.onClose}></div>
  );
};
