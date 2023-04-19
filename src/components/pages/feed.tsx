
import { FeedLeft } from "../feed/feed-left";
import { FeedRight } from "../feed/feed-right";
import styles from "../pages/feed.module.css";

export function Feed() {

    return (   
        
      <div className={styles.wrapper}>    
      <h1 className={styles.header}>Лента заказов</h1> 
        <div className={styles.left}>
        <FeedLeft/>
        </div>
        <div className={styles.right}>
          <FeedRight/>
        </div>     
      </div>
    
    );
  }