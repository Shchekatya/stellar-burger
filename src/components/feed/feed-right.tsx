import styles from "./feed-right.module.css";
import { useSelector } from "../../services/hooks/hooks";
import { TSingleOrder } from "./feed-left";
import clsx from "clsx";
import { TMessage } from "../../services/actions/ws-actions";

export function FeedRight() {
  const messages:TMessage = useSelector((state) => state.wsReducer.messages);

   const ordersStatus = messages.orders;
 

  return (
    <>
      <div className={styles.orders}>
        <div className={styles.ordersReady}>
          <p className="text text_type_main-medium">Готовы:</p>
          <ul
            className={clsx(
              styles.ordersReadyList,
              "text text_type_digits-default"
            )}
          >
            {ordersStatus
              .filter((el: TSingleOrder) => el.status === "done")
              .map((e: TSingleOrder, index: number) => {
                if (index < 20) return <li key={e._id}>{e.number}</li>;
              })}
          </ul>
        </div>
        <div className={styles.ordersProgress}>
          <p className="text text_type_main-medium">В работе:</p>
          <ul className="text text_type_digits-default">
            {ordersStatus
              .filter(
                (el: TSingleOrder) =>
                  el.status === "pending" || el.status === "created"
              )
              .map((e: TSingleOrder) => {
                return <li key={e._id}>{e.number}</li>;
              })}
          </ul>
        </div>
      </div>
      <div className={styles.all}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{messages.total}</p>
      </div>
      <div className={styles.today}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{messages.totalToday}</p>
      </div>
    </>
  );
}
