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
import {
  ADD_CONSTRUCTOR,
  ADD_BUN,
  UPDATE_CONSTRUCTOR,
  DELETE_CONSTRUCTOR,
} from "../../services/actions/actions";
import { BurgerConstructorSinge } from "./burger-constructor-single";
import { BASE_URL } from "../../utils/api";
import { getCookie } from "../../utils/cookie";
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { sendOrder } from "../../services/actions/send-order";
import { useAppDispatch, useSelector } from "../../services/hooks/hooks";
import {TItem} from "../ingredients/ingredient-single";
import { useDispatch } from 'react-redux'
import { AppThunk } from "../..";
import { Dispatch } from 'redux';
import { AppDispatch } from '../../index';


export const BurgerConstructor = () => {
  const orders = useSelector((state:any) => state.changeConstructor);
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  const result = useSelector((state:any) => state.changeConstructor.result);
  const navigate=useNavigate();
  const dispatch = useAppDispatch();
  const location=useLocation();

  type TOrder ={
    key: string   
    _id: string
    price: number
    image: string
    name: string
    type?: "top" | "bottom" | undefined
    id: string
    index: number
  }
  
type TCurr={  
     price?: number
 }
  const addConstructor = (item:any) => (dispatch: Dispatch)=> {
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

  const [, dropTarget] = useDrop({
    accept: "items",
    drop(item) {
      addConstructor(item);
    },
  });

  const [open, setOpen] = useState(false);
  const orderArr = orders.main.map((item:TItem) => item._id.toString());
  orders.bun && orderArr.push(orders.bun._id);
  const sum = useMemo(
   
    () =>
      orders.main.reduce((acc:number, cur:TCurr) => acc + cur.price!, 0) +
      (orders.bun && orders.bun.price * 2),
    [orders]
  );

  const delCard = useCallback(
    (dragIndex:number) => (dispatch: Dispatch)=> {
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
    (dragIndex:number, hoverIndex:number) => (dispatch: Dispatch)=> {
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
          
          {orders.main.map((order:TOrder, index:number) => {        
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
            console.log(isLogged)
            if (!isLogged) {
              navigate('/login',{ state: location })         
            } else {
            setOpen(true);
            dispatch(sendOrder(orderArr));
          }}}
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
