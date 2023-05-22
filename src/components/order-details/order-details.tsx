import img from "../../images/img";
import OrderStyle from "../order-details/order-details.module.css";
import { useContext } from "react";
import { PostContext } from "../../utils/post-context";

export const OrderDetails = () => {
  const result = useContext(PostContext);

  return (
    <div className={OrderStyle.txt}>
      <p className="text text_type_digits-large">
        {result.result.order.number}
      </p>
      <p className="text text_type_main-medium">индефикатор заказа</p>
      <div className="m-15">{img}</div>

      <p className="text text_type_main-small">
        Ваш {result.result.name} начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
