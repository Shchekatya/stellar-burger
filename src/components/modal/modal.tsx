import { createPortal } from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import ModalStyle from "../modal/modal.module.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { WS_CONNECTION_START,WS_CONNECTION_CLOSED } from "../../services/actions/ws-actions";
import { useAppDispatch } from "../../services/hooks/hooks";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

const modalElement = document.querySelector("#modal");

type TProp ={
  children: string | JSX.Element | JSX.Element[] 
  onClose: ()=>void
}
export const Modal = (props: TProp) => {
  const dispatch=useAppDispatch();
  const location=useLocation();


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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
