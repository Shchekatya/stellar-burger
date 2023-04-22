
import { FeedLeft } from "../components/feed/feed-left";
import { FeedRight } from "../components/feed/feed-right";
import styles from "../pages/feed.module.css";
import { useEffect } from "react";
import { WS_CONNECTION_START,WS_CONNECTION_CLOSED } from "../../src/services/actions/ws-actions";
import { useAppDispatch, useSelector } from "../../src/services/hooks/hooks";
import { useLocation } from "react-router-dom";
import { TMessage } from "../../src/services/actions/ws-actions";

export function Feed() {
  const dispatch=useAppDispatch();
  const location=useLocation();
  const messages:TMessage=useSelector(state => state.wsReducer.messages)
  console.log(messages)
  useEffect(
    () => {  
        dispatch({ 
          type: WS_CONNECTION_START,
          payload:'wss://norma.nomoreparties.space/orders/all' });     
        return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });  
        };
    },
    [location] 
  );
  if (messages) {
    return (           
      <div className={styles.wrapper}>    
      <h1 className={styles.header}>Лента заказов</h1> 
        <div className={styles.left}>
        <FeedLeft/>
        </div>
        <div className={styles.right}>
          <FeedRight/>
        </div>     
      </div>
    
    );} else {
return (
  <div>Нет данных</div>
)
    }
  }