import { useEffect } from "react";
import { useAppDispatch, useSelector } from "../../services/hooks/hooks";
import { FeedOrder } from "../feed/feed-order";
import styles from "../pages/order.module.css";
import {TSingleOrder} from '../feed/feed-left';
import { WS_CONNECTION_START } from "../../services/actions/ws-actions";


export function Order() {
    const dispatch=useAppDispatch();
    const messages=useSelector(state => state.wsReducer.messages)
    
    useEffect(
      () => {  
          dispatch({ type: WS_CONNECTION_START });     
      },
      [] 
    );
    let getOrders=[]
    if (messages.length) {
      getOrders=JSON.parse(messages).orders
    };
return (
    <div className={styles.wrap}>  
    {getOrders.length ? (
            getOrders.map((item:TSingleOrder) => (            
              <FeedOrder item={item}  />         
              ))
          ) : (
            <div>Нет в наличии</div>
          )}     
          </div>
)
}