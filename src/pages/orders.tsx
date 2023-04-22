import { useEffect } from "react";
import { useAppDispatch, useSelector } from "../services/hooks/hooks";
import { FeedOrder } from "../components/feed/feed-order";
import styles from "../pages/order.module.css";
import {TSingleOrder} from '../components/feed/feed-left';
import { WS_CONNECTION_START,WS_CONNECTION_CLOSED, WS_CONNECTION_PROFILE } from "../services/actions/ws-actions";
import { getCookie } from "../utils/cookie";
import { TMessage } from "../services/actions/ws-actions";
import { useLocation } from "react-router-dom";


export function Order() {
    const dispatch=useAppDispatch();
    const messages:TMessage=useSelector(state => state.wsReducer.messages)
    const location=useLocation()
    useEffect(
      () => {  
        const cookie=getCookie("authToken")
          dispatch({ 
            type: WS_CONNECTION_START,
            payload:`wss://norma.nomoreparties.space/orders?token=${cookie}`});                
          return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });  
            };
      },
      [location] 
    );
   
    if (messages) {
    const getOrders=messages.orders
    return (
      <div className={styles.wrap}>      
      {getOrders ? (
              getOrders.map((item:TSingleOrder) => (            
                <FeedOrder item={item} key={item._id} />         
                ))
            ) : (
              <div>Нет заказов</div>
            )}     
            </div>
  )
    } else {
      return (
        <div>нет данных</div>
      )
    }

}