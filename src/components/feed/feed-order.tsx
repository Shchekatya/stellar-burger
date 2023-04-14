import styles from "./feed-order.module.css";
import { FeedIngIcon } from "../feed/feed-ing-icon";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// import {TSingleOrder} from './feed-left'

export function FeedOrder(prop:any) {
  const item=prop.item  
  console.log(item)
    const today = new Date() 
    const ArrPic=['https://code.s3.yandex.net/react/code/meat-02-mobile.png', 
  'https://code.s3.yandex.net/react/code/sauce-03-mobile.png', 
  'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  'https://code.s3.yandex.net/react/code/bun-02-mobile.png']
    const icons = ArrPic.map((el, index) => (
      <FeedIngIcon
        src={el}
        srcSet={el}
        overflow={!index ? 6 : 0}
        extraClass={styles.items_picture}
      />
    ));
    return (
        <div className={styles.order}>
        <div className={styles.orderHeader}>
          <p className="text text_type_digits-default">{1}</p>
          <FormattedDate
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
          </div>
            
            <p className={`${styles.orderName} text text_type_main-small`}>Death Star Starship Main бургер</p>
            <div className={styles.orderMain}>
            <div className={styles.orderMainImg}>
            <div className={styles.items_list}>{icons}</div>
            </div>
            <div className={styles.orderMainPrice}>
            <p className="text text_type_digits-default">
        480
        <CurrencyIcon type="primary" />
      </p>
            </div>
            </div>
        </div>

    )
}