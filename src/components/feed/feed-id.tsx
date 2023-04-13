import { FeedIdSingle } from "./feed-id-single";
import clsx from "clsx";
import styles from "./feed-id.module.css";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function FeedId () {
    const today = new Date() 
    return (
        <div className={styles.wrapper}>
        <p className={clsx(styles.number,"text text_type_digits-default")}>#034535</p>
        <p className="text text_type_main-medium mt-10">Black Hole Singularity острый бургер</p>
        <p className={clsx(styles.status, "text text_type_main-small mt-3")}>Выполнен</p>
        <p className="text text_type_main-medium mt-15">Состав:</p>
        <FeedIdSingle/>
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
<p className="text text_type_digits-default">2 x 20
        <CurrencyIcon type="primary" />
        </p>
</div>
        </div>
    )
}