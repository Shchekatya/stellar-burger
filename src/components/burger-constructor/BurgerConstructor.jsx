import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import bConst from "../burger-constructor/burger-constructor.module.css";
import { Modal } from "../modal/Modal";
import { OrderDetails } from "../order-details/OrderDetails";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";

export const BurgerConstructor = (props) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const sum = useMemo(
    () => props.orders.reduce((acc, cur) => acc + cur.price, 0),
    [props.orders]
  );


  return (
    <div className={bConst.right}>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className={bConst.list}
      >
        {props.orders.map((order) => (
          <>
            <div key={order._id} onClick={() => setDetails(true)}>
              <ConstructorElement
                type={order.type}
                isLocked={true}
                text={order.name}
                price={order.price}
                thumbnail={order.image}
              />
            </div>

            <Modal details={details} onClose={() => setDetails(false)}>
              <IngredientDetails items={props.items} id={order._id} />
            </Modal>
          </>
        ))}
      </div>
      <div className={bConst.bottom}>
        <p className="text text_type_digits-medium">{sum}</p>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => setOpen(true)}
        >
          Оформить заказ
        </Button>

        <Modal open={open} onClose={() => setOpen(false)}>
          <OrderDetails />
        </Modal>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  orders: PropTypes.array,
};
