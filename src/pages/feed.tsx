
import { FeedLeft } from "../components/feed/feed-left";
import { FeedRight } from "../components/feed/feed-right";
import styles from "../pages/feed.module.css";
import { useEffect } from "react";
import { WS_CONNECTION_START,WS_CONNECTION_CLOSED } from "../../src/services/actions/ws-actions";
import { useAppDispatch } from "../../src/services/hooks/hooks";
import { useLocation } from "react-router-dom";

export function Feed() {
  const dispatch=useAppDispatch();
  const location=useLocation();
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
    
    );
  }