import { createPortal } from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import ModalStyle from "../modal/modal.module.css";
import { useEffect } from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalElement = document.querySelector("#modal");

type TProp ={
  children: string | JSX.Element | JSX.Element[] 
  onClose: ()=>void
}
export const Modal = (props: TProp) => {
  useEffect(() => {
    function closeByEscape(e:KeyboardEvent) {
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
      <ModalOverlay onClick={props.onClose}/>    
      <div className={ModalStyle.background}>
        <div className={ModalStyle.modal}>
        <div className={ModalStyle.close}>
        <CloseIcon type="primary" onClick={props.onClose} />
        </div>
          <div className={ModalStyle.txt}>{props.children}</div>
        </div>
      </div>
    </>,
    modalElement!
  );
};

