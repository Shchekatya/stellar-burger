import ModalOverStyle from "../modal-overlay/modal-overlay.module.css";
import PropTypes from "prop-types";

type TModalProps={
  onClick: ()=>void
}

export const ModalOverlay = (props:TModalProps) => {
  return (
    <div className={ModalOverStyle.background} onClick={props.onClick} data-test="modal-overlay"></div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};
