import ModalOverStyle from "../modal-overlay/modal-overlay.module.css";
import PropTypes from "prop-types";

export const ModalOverlay = (props) => {
  return (
    <div className={ModalOverStyle.background} onClick={props.onClick}></div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};
