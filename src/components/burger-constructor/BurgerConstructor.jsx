import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
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
} from "../../services/actions/actions";
import { BurgerConstructorSinge } from "./burger-constructor-single";

export const BurgerConstructor = (props) => {
  const orders = useSelector((state) => state.changeConstructor);

  const dispatch = useDispatch();
  const addConstructor = (item) => {
    if (item.item.type == "bun") {
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

  const [, dropMain] = useDrop({
    accept: "main",
    drop(item) {
      console.log(item.order);
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
  const sendOrder = async (
    url = "https://norma.nomoreparties.space/api/orders",
    data = { ingredients: idArr }
  ) => {
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    // Получаем перетаскиваемый ингредиент
    const dragCard = orders.main[dragIndex];
    const newCards = [...orders.main];
    // Удаляем перетаскиваемый элемент из массива
    newCards.splice(dragIndex, 1);
    // Вставляем элемент на место того элемента,
    // над которым мы навели мышку с "перетаскиванием"
    // Тут просто создается новый массив, в котором изменен порядок наших элементов
    newCards.splice(hoverIndex, 0, dragCard);
    // В примере react-dnd используется библиотека immutability-helper
    // Которая позволяет описывать такую имутабельную логику более декларативно
    // Но для лучше понимания обновления массива,
    // Советую использовать стандартный splice

    dispatch({
      type: UPDATE_CONSTRUCTOR,
      payload: newCards,
    });
    console.log(111);
  }, [orders.main, dispatch]);

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
        <div className={bConst.mainlist} ref={dropMain}>
          {orders.main.map((order, index) => {
            return (
              <BurgerConstructorSinge
                order={order}
                moveCard={moveCard}
                index={index}
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
          Оформить заказ
        </Button>
        {open && post.result && (
          <Modal onClose={() => setOpen(false)}>
            {" "}
            {}
            <PostContext.Provider value={{ post }}>
              <OrderDetails />
            </PostContext.Provider>
          </Modal>
        )}
      </div>
    </div>
  );
};

