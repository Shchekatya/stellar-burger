import styles from "./feed-order.module.css";
import { FeedIngIcon } from "../feed/feed-ing-icon";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TSingleOrder } from "./feed-left";
import { useSelector } from "../../services/hooks/hooks";
import { TItem } from "../ingredients/ingredient-single";
import { Link, useLocation } from "react-router-dom";


type TProp = {
  item: TSingleOrder;
};
export function FeedOrder(prop: TProp) {

  const location = useLocation();
  const singleOrder = prop.item;
  const ingredients = prop.item.ingredients;
  const items = useSelector((state) => state.loadIngredients.items);
  type TCurr = {
    price?: number;
  };
  const orderId = singleOrder["_id"];
  let ingImg: Array<TItem> = [];
  ingredients.forEach((el: string | null) => {
    if (el != null) {
      const arr: TItem | undefined = items.find((e: TItem) => e._id === el);
      if (arr != undefined) {
        const ar: number = ingImg.push(arr);
      }
    }
  });


  const price = ingImg.reduce((acc: number, cur: TCurr) => acc + cur.price!, 0);

  const today = new Date();
  const more = ingImg.length - 5;
  const icons = ingImg.slice(0, 5).map((el: any, index: number) => {
    if (el != undefined) {
      return (
        <FeedIngIcon
          src={el.image}
          overflow={!index ? more : 0}
          extraClass={styles.items_picture}
          key={index}
        />
      );
    }
  });
  return (
    <Link
      key={orderId}
      to={`${orderId}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div className={styles.order}>
        <div className={styles.orderHeader}>
          <p className="text text_type_digits-default">#{singleOrder.number}</p>
          <FormattedDate date={new Date(singleOrder.createdAt)} />
        </div>

        <p className={`${styles.orderName} text text_type_main-small`}>
          {singleOrder.name}
        </p>
        <div className={styles.orderMain}>
          <div className={styles.orderMainImg}>
            <div className={styles.items_list}>{icons}</div>
          </div>
          <div className={styles.orderMainPrice}>
            <p className="text text_type_digits-default">
              {price}
              <CurrencyIcon type="primary" />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
