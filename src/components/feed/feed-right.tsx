import styles from "./feed-right.module.css";


export function FeedRight() {
    return (
        <>
        <div className={styles.orders}> 
          <div className={styles.ordersReady}>
            <p className="text text_type_main-medium">Готовы:</p>
            <ul className="text text_type_digits-default">
                <li>034533</li>
                <li>034532</li>
                <li>034530</li>
                <li>034527</li>
                <li>034525</li>
            </ul>
          </div>
          <div className={styles.ordersProgress}>
          <p className="text text_type_main-medium">В работе:</p>
            <ul className="text text_type_digits-default">
                <li>034538</li>
                <li>034541</li>
                <li>034542</li>           
            </ul>
          </div>
        </div>          
            <div className={styles.all}>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className="text text_type_digits-large">28 752</p>
            </div>
            <div className={styles.today}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">138</p>
            </div>
            </>
    )
}