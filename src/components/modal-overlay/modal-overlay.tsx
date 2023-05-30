import ModalOverStyle from "../modal-overlay/modal-overlay.module.css";

type TModalProps={
  onClick: ()=>void
}

export const ModalOverlay = (props:TModalProps) => {
  return (
    <div className={ModalOverStyle.background} onClick={props.onClick} data-test="modal-overlay"></div>
  );
};
