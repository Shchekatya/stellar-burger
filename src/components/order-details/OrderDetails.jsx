import img from "../../images/img";
import OrderStyle from "../order-details/order-details.module.css";

export const OrderDetails = () => {
  return (
    <div className={OrderStyle.txt}>
      <p className="text text_type_digits-large">034536</p>
      <p className="text text_type_main-medium">индефикатор заказа</p>
      <div className="m-15">{img}</div>

      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
