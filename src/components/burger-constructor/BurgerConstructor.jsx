import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useMemo, useCallback } from "react";
import bConst from "../burger-constructor/burger-constructor.module.css";
import { Modal } from "../modal/Modal";
import { OrderDetails } from "../order-details/OrderDetails";
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
import { postOrder } from "../../utils/api";
import { getCookie } from "../../utils/cookie";
import { Link, Navigate, NavLink } from "react-router-dom";

export const BurgerConstructor = () => {
  const orders = useSelector((state) => state.changeConstructor);

  const dispatch = useDispatch();

  const addConstructor = (item) => {
    if (item.item.type === "bun") {
      dispatch({
        type: ADD_BUN,
        payload: item,
      });
    } else {
      dispatch({
        type: ADD_CONSTRUCTOR,
        payload: item,
      });
    }
  };

  const [, dropTarget] = useDrop({
    accept: "items",
    drop(item) {
      addConstructor(item);
    },
  });

  const [open, setOpen] = useState(false);

  const [post, setPost] = useState({});
  const idArr = orders.main.map((item) => item._id.toString());
  orders.bun && idArr.push(orders.bun._id);

  const sum = useMemo(
    () =>
      orders.main.reduce((acc, cur) => acc + cur.price, 0) +
      (orders.bun && orders.bun.price * 2),
    [orders]
  );
  let result;
  let cookie = getCookie("authToken");

  const sendOrder = async (url = postOrder, data = { ingredients: idArr }) => {
 
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookie,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        result = await response.json();
        setPost({ result });
      } else {
        console.log("Ошибка HTTP: " + response.status);
      }
    } catch (error) {
      console.log("АШИПКА!!", error);
    }
  };
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
      <div
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className={bConst.list}
      >
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
                key={id}
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
            sendOrder();
          }}
        >
          {!cookie ? <Link to="/login"> Оформить заказ</Link> : 'Оформить заказ'}          
          
        </Button>

        {open && post.result && (
          <Modal onClose={() => setOpen(false)}>
            <PostContext.Provider value={{ post }}>
              <OrderDetails />
            </PostContext.Provider>
          </Modal>
        )}
      </div>
    </div>
  );
};
