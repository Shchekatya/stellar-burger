import clsx from "clsx";
import { FC } from "react";
import styles from "./feed-ing-icon.module.css";

interface FeedIngIconProps {
  src: string;
  alt?: string;
  overflow?: number;
  extraClass?: string;
}

export const FeedIngIcon: FC<FeedIngIconProps> = ({
  src,
  alt = "ingredient",
  overflow = 0,
  extraClass,
}) => {
  return (
    <div className={clsx(styles.container, extraClass)}>
      <div>
        <picture className={styles.picture}>
          <img src={src} alt={alt} width="112" height="56" />
        </picture>
        {overflow > 0 && (
          <div
            className={clsx(styles.container, styles.picture, styles.overflow)}
          >
            <div className={clsx(styles.picture, "text text_type_main-small")}>
              +{overflow}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
