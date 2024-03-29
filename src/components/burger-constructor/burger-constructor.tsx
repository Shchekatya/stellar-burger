import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useMemo, useCallback } from "react";
import bConst from "../burger-constructor/burger-constructor.module.css";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { PostContext } from "../../utils/post-context";
import { useDrop } from "react-dnd";
import {
  UPDATE_CONSTRUCTOR,
  DELETE_CONSTRUCTOR,
} from "../../services/actions/actions";
import { BurgerConstructorSinge } from "./burger-constructor-single";
import { useLocation, useNavigate } from "react-router-dom";
import { sendOrder } from "../../services/actions/send-order";
import { useAppDispatch, useSelector } from "../../services/hooks/hooks";
import { TItem } from "../ingredients/ingredient-single";

export const BurgerConstructor = () => {
  const orders = useSelector((state) => state.changeConstructor);
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  const result = useSelector((state) => state.changeConstructor.result);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  // type TOrder = {   
  //   proteins?: string;
  //   calories?: string;
  //   fat?: string;
  //   carbohydrates?: string;   
  //   _id: string;
  //   price: number ;
  //   image: string;
  //   name: string;
  //   // type: "top" | "bottom" | undefined;
  //   type: string;
  //   id: string;
  //   index: number;
  //   key: string;
  // };

  // type TCurr = {
  //   price?: number;
  // };

  const [, dropTarget] = useDrop({
    accept: "items",
  });

  const [open, setOpen] = useState(false);
  const orderArr = orders.main.map((item: TItem) => item._id.toString());
  orders.bun && orderArr.push(orders.bun._id);
  // const sum = useMemo(() =>
  //     orders.main.reduce((acc: number, cur: TItem) => acc + cur.price, 0)
  //     + (orders.bun && orders.bun.price * 2),
  //   [orders]
  // );

  const sum = useMemo(() =>
  orders.main.reduce((acc, cur) => acc + cur.price!, 0),
[orders]
);

  const delCard = useCallback(
    (dragIndex: number) => {
      const newCards = [...orders.main];
      newCards.splice(dragIndex, 1);
      const orderArr = newCards.map((item: TItem) => item._id.toString());
      orders.bun && orderArr.push(orders.bun._id);
      dispatch({
        type: DELETE_CONSTRUCTOR,
        payload: newCards,
        order: orderArr,
      });
    },
    [orders.main, dispatch]
  );

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = orders.main[dragIndex];
      const newCards = [...orders.main];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      const orderArr = newCards.map((item: TItem) => item._id.toString());
      orders.bun && orderArr.push(orders.bun._id);
      dispatch({
        type: UPDATE_CONSTRUCTOR,
        payload: newCards,
        order: orderArr,
      });
    },
    [orders.main, dispatch]
  );

  return (
    <div className={bConst.right} ref={dropTarget} data-test="drop-area">
      {!orders.bun &&<div className={bConst.toDo}>
      <p className="text text_type_main-small mt-40">Перетащите сюда булку и ингредиенты для вашего космического бургера</p>
      </div>}
      <div className={bConst.list} >     
        {orders.bun && (
          <div data-test="bun-top">
            <ConstructorElement
              type="top"              
              isLocked={true}
              text={`${orders.bun.name} (верх)`}
              price={orders.bun.price!}
              thumbnail={orders.bun.image!}
            />
          </div>
        )}
        <div className={bConst.mainlist} data-test="main">
          {orders.main.map((order, index) => {
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
          <div data-test="bun-bottom">
            <ConstructorElement
              type="bottom"
              isLocked={true}              
              text={`${orders.bun.name} (низ)`}
              price={orders.bun.price!}
              thumbnail={orders.bun.image!}
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
            console.log(isLogged);
            if (!isLogged) {
              navigate("/login", { state: location });
            } else {
              setOpen(true);
              dispatch(sendOrder(orderArr));
            }
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
