import ModalOverStyle from "../modal-overlay/modal-overlay.module.css";
import PropTypes from "prop-types";


export const ModalOverlay = ({onClick}:any) => {
  return (
    <div className={ModalOverStyle.background} onClick={onClick}></div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};
