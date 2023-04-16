import { FeedIngIcon } from "./feed-ing-icon";
import styles from "./feed-id-single.module.css";
import clsx from "clsx";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {TItem} from '../ingredients/ingredient-single'
import { useSelector } from "../../services/hooks/hooks";


export function FeedIdSingle ({ing}:any) {
console.log(ing)
    return (
        <div className={clsx(styles.singleWrap, "mr-6")}>
            <div className={clsx(styles.main, "mt-6")}>
        <FeedIngIcon
        src={ing.image}      
        extraClass={styles.items_picture}
      />
      <p className="text text_type_main-small ml-4">{ing.name}</p>
      </div>
      <div className={styles.price}>
      <p className="text text_type_digits-default">{ing.price}
        <CurrencyIcon type="primary" />
        </p>
      </div>
      </div>
    )
   
}