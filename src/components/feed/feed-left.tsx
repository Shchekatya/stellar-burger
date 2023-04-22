import { useEffect } from "react";
import { useSelector } from "../../services/hooks/hooks";
import styles from "./feed-left.module.css";
import { FeedOrder } from "./feed-order";
import { WS_CONNECTION_START,WS_CONNECTION_CLOSED } from "../../services/actions/ws-actions";
import { useAppDispatch } from "../../services/hooks/hooks";
import { TMessage } from "../../services/actions/ws-actions";

export type TSingleOrder={
  _id: string
  status: string
  name: string
  number: number
  ingredients: string[]
  updatedAt: string
  createdAt: string   
}

export function FeedLeft() {

const messages:TMessage=useSelector(state => state.wsReducer.messages)
console.log(messages)

 const getOrders=messages.orders

    return (
      <div className={styles.wrapper}>  
{getOrders.length ? (
        getOrders.map((item:TSingleOrder) => (            
          <FeedOrder item={item} key={item._id}/>         
          ))
      ) : (
        <div>Нет в наличии</div>
      )}     
      </div>
    );
  }