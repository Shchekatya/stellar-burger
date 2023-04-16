import { FeedIdSingle } from "./feed-id-single";
import clsx from "clsx";
import styles from "./feed-id.module.css";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks/hooks";
import {TSingleOrder} from './feed-left';
import {TItem} from '../ingredients/ingredient-single'

export function FeedId () {
    const today = new Date() 
    const { orderId } = useParams();
    const messages=useSelector(state => state.wsReducer.messages)
    const items = useSelector((state:any) => state.loadIngredients.items);
    type TCurr={  
      price?: number
  }
  let order
  let ingredients
  let ingImg:Array<TItem>=[]
  let orderStatus
  let price
if (messages.length) {
 order=JSON.parse(messages).orders.find(
    (order:TSingleOrder) => order._id === orderId
  );
  ingredients=order.ingredients

ingredients.forEach((el: string) => {
const arr:TItem=items.find((e: TItem) => 
   e._id===el     
 ) 
 const ar:number=ingImg.push(arr)
})
if (order.status==='done') {
  orderStatus="Выполнен"
} else {
  orderStatus="В процессе"
}
price=ingImg.reduce((acc:number, cur:TCurr) => acc + cur.price!, 0) 
};

console.log(ingImg)

  
    if (!order) {
      return null;
    }
    return (
        <div className={styles.wrapper}>
        <p className={clsx(styles.number,"text text_type_digits-default")}>#{order.number}</p>
        <p className="text text_type_main-medium mt-10">{order.name}</p>
        <p className={clsx(styles.status, "text text_type_main-small mt-3")}>{orderStatus}</p>
        <p className="text text_type_main-medium mt-15">Состав:</p>
        <div className={styles.ing}>
        {
          ingImg.map(ing => 
            <FeedIdSingle ing={ing}/>
          )
        }
       </div>
        <div className={styles.bottom}>
        <FormattedDate className={clsx(styles.date, "text text_type_main-small")}
  date={
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getHours(),
      today.getMinutes() - 1,
      0,
    )
  }
/>
<p className="text text_type_digits-default">{price}
        <CurrencyIcon type="primary" />
        </p>
</div>
        </div>
    )
}