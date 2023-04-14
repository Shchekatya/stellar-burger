import { FeedIngIcon } from "./feed-ing-icon";
import styles from "./feed-id-single.module.css";
import clsx from "clsx";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


export function FeedIdSingle () {
   
    return (
        <div className={clsx(styles.singleWrap, "mr-6")}>
            <div className={clsx(styles.main, "mt-6")}>
        <FeedIngIcon
        src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'      
        extraClass={styles.items_picture}
      />
      <p className="text text_type_main-small ml-4">Флюоресцентная булка R2-D3</p>
      </div>
      <div className={styles.price}>
      <p className="text text_type_digits-default">2 x 20
        <CurrencyIcon type="primary" />
        </p>
      </div>
      </div>
    )
   
}