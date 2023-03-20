import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useMemo, useCallback } from "react";
import bConst from "../burger-constructor/burger-constructor.module.css";
import { Modal } from "../modal-ingredient/modal";
import { OrderDetails } from "../order-details/order-details";
import { PostContext } from "../../utils/post-context";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CONSTRUCTOR,
  ADD_BUN,
  UPDATE_CONSTRUCTOR,
  DELETE_CONSTRUCTOR,
} from "../../services/actions/actions";
import { BurgerConstructorSinge } from "./burger-constructor-single";
import { BASE_URL } from "../../utils/api";
import { getCookie } from "../../utils/cookie";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useSendOrder } from "../../services/actions/send-order";

export const BurgerConstructor = () => {
  const orders = useSelector((state) => state.changeConstructor);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const result = useSelector((state) => state.changeConstructor.result);
  const dispatch = useDispatch();

  const addConstructor = (item) => {
    if (item.item.type === "bun") {
      dispatch({
        type: ADD_BUN,
        payload: item,
        order: orderArr,
      });
    } else {
      dispatch({
        type: ADD_CONSTRUCTOR,
        payload: item,
        key: uuidv4(),
        order: orderArr,
      });
    }
  };
  const sendOrder = useSendOrder();
  const [, dropTarget] = useDrop({
    accept: "items",
    drop(item) {
      addConstructor(item);
    },
  });

  const [open, setOpen] = useState(false);
  const orderArr = orders.main.map((item) => item._id.toString());
  orders.bun && orderArr.push(orders.bun._id);
  const sum = useMemo(
    () =>
      orders.main.reduce((acc, cur) => acc + cur.price, 0) +
      (orders.bun && orders.bun.price * 2),
    [orders]
  );

  const delCard = useCallback(
    (dragIndex) => {
      const newCards = [...orders.main];
      newCards.splice(dragIndex, 1);
      dispatch({
        type: DELETE_CONSTRUCTOR,
        payload: newCards,
      });
    },
    [orders.main, dispatch]
  );

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = orders.main[dragIndex];
      const newCards = [...orders.main];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      dispatch({
        type: UPDATE_CONSTRUCTOR,
        payload: newCards,
      });
    },
    [orders.main, dispatch]
  );

  return (
    <div className={bConst.right} ref={dropTarget}>
      <div className={bConst.list}>
        {orders.bun && (
          <div>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${orders.bun.name} (верх)`}
              price={orders.bun.price}
              thumbnail={orders.bun.image}
            />
          </div>
        )}
        <div className={bConst.mainlist}>
          {orders.main.map((order, index) => {
            const id = order._id + index;
            return (
              <BurgerConstructorSinge
                order={order}
                moveCard={moveCard}
                delCard={delCard}
                index={index}
                key={order.key}
              />
            );
          })}
        </div>
        {orders.bun && (
          <div>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${orders.bun.name} (низ)`}
              price={orders.bun.price}
              thumbnail={orders.bun.image}
            />
          </div>
        )}
      </div>
      <div className={bConst.bottom}>
        <p className="text text_type_digits-medium">{sum}</p>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            setOpen(true);
            dispatch(sendOrder);
          }}
        >
          Оформить заказ
        </Button>

        {open && result.success && (
          <Modal onClose={() => setOpen(false)}>
            <PostContext.Provider value={{ result }}>
              <OrderDetails />
            </PostContext.Provider>
          </Modal>
        )}
      </div>
    </div>
  );
};
