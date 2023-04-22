import { FeedIdSingle } from "./feed-id-single";
import clsx from "clsx";
import styles from "./feed-id.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFetcher, useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks/hooks";
import { TSingleOrder } from "./feed-left";
import { TItem } from "../ingredients/ingredient-single";
import { useEffect } from "react";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/ws-actions";
import { useAppDispatch } from "../../services/hooks/hooks";
import { TMessage } from "../../services/actions/ws-actions";

export function FeedId() {
  const today = new Date();
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const messages:TMessage = useSelector((state) => state.wsReducer.messages);
  const items = useSelector((state) => state.loadIngredients.items);


  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: "wss://norma.nomoreparties.space/orders/all",
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);


  let ingImg: Array<TItem> = [];
  let orderStatus:string;
  let price:number;
  if (messages) {
 const order: TSingleOrder | undefined= messages.orders.find(
      (order: TSingleOrder) => order._id === orderId
    );
if (order) {
  const  ingredients:string[] = order.ingredients;
  ingredients.forEach((el: string | null) => {
    if (el != null) {
      const arr: TItem | undefined = items.find((e: TItem) => e._id === el);
      if (arr != undefined) {
        ingImg.push(arr);
      }
    }
  });
  if (order.status === "done") {
    orderStatus = "Выполнен";
  } else {
    orderStatus = "В процессе";
  }
  price = ingImg.reduce((acc, cur) => acc + cur.price!, 0);
  let ar;
  ingImg.forEach((element: TItem) => {
    ar = ingImg.filter((e) => e._id === element._id);
    if (ar.length > 1) {
      const del = ingImg.indexOf(element);
      ingImg.splice(del, 1);
      element.count = ar.length;
    }
  });

  if (!order) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      <p className={clsx(styles.number, "text text_type_digits-default")}>
        #{order.number}
      </p>
      <p className="text text_type_main-medium mt-10">{order.name}</p>
      <p className={clsx(styles.status, "text text_type_main-small mt-3")}>
        {orderStatus}
      </p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <div className={styles.ing}>
        {ingImg.map((ing) => (
          <FeedIdSingle ing={ing} key={ing._id} />
        ))}
      </div>
      <div className={styles.bottom}>
        <FormattedDate
          className={clsx(styles.date, "text text_type_main-small")}
          date={new Date(order.createdAt)}
        />
        <p className="text text_type_digits-default">
          {price}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
}else {
  return (
    <div>нет данных</div>
  )}
   
  } else {
    return (
      <div>нет данных</div>
    )
  }
 
}
