import { useEffect } from "react";
import { useAppDispatch, useSelector } from "../services/hooks/hooks";
import { FeedOrder } from "../components/feed/feed-order";
import styles from "../pages/order.module.css";
import {TSingleOrder} from '../components/feed/feed-left';
import { WS_CONNECTION_START,WS_CONNECTION_CLOSED } from "../services/actions/ws-actions";


export function Order() {
    const dispatch=useAppDispatch();
    const messages=useSelector(state => state.wsReducer.messages)
    
    useEffect(
      () => {  
          dispatch({ type: WS_CONNECTION_START });     
          return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });  
            };
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
              <FeedOrder item={item} key={item._id} />         
              ))
          ) : (
            <div>Нет в наличии</div>
          )}     
          </div>
)
}