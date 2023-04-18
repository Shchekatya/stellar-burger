import { useEffect } from "react";
import { useSelector } from "../../services/hooks/hooks";
import styles from "./feed-left.module.css";
import { FeedOrder } from "./feed-order";
import { WS_CONNECTION_START } from "../../services/actions/ws-actions";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../services/hooks/hooks";

export type TSingleOrder={
  _id: string
  status: string
  name: string
  number: number
  ingredients: []
  updatedAt: string
  createdAt: string   
}

export function FeedLeft() {
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