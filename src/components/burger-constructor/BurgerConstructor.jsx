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
import { IngredientContext } from "../../utils/ingredient-context";
import { useContext } from "react";
import { PostContext } from "../../utils/post-context";




export const BurgerConstructor = (props) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [post, setPost] = useState({});   
 const idArr = props.orders.main.map(item => item._id.toString());
 (props.orders.bun &&
  idArr.push(props.orders.bun._id))

  const sum = useMemo(
    () => (props.orders.main.reduce((acc, cur) => acc + cur.price, 0) + (props.orders.bun && props.orders.bun.price*2)),
    [props.orders]
  );
  let result;
  const sendOrder = async (url = 'https://norma.nomoreparties.space/api/orders', 
  data = {"ingredients": idArr}) => {  
    try {
    let response = await fetch(url, {
      method: 'POST',   
      headers: {
        'Content-Type': 'application/json'
      },   
      body: JSON.stringify(data),
    });
    if (response.ok) {
    result = await response.json();      
     setPost({result});     
    } else {
      console.log("Ошибка HTTP: " + response.status);  }
  } catch (error) {
    console.log("АШИПКА!!", error);   
  }};

  const state= useContext(IngredientContext); 
  const items=state.state.items;

  return (
    <div className={bConst.right}>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className={bConst.list}
      >
         {props.orders.bun && <div onClick={() => setDetails(true)}>
              <ConstructorElement
              type="top"                
                isLocked={true}
                text={`${props.orders.bun.name} (верх)`}
                price={props.orders.bun.price}
                thumbnail={props.orders.bun.image}
              />
            </div>}
       
        {props.orders.main.map((order) => {
          return (
          <>
            <div className={bConst.main}  onClick={() => setDetails(true)}>                
              <ConstructorElement
              key={order._id}
                type={order.type}
                isLocked={false}
                text={order.name}
                price={order.price}
                thumbnail={order.image}
              />
            </div>
{details && 
<Modal onClose={() => setDetails(false)}>
              <IngredientDetails items={items} id={order._id} />
            </Modal>
}
            
          </>
       ) })}
{props.orders.bun && <div onClick={() => setDetails(true)}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${props.orders.bun.name} (низ)`}
                price={props.orders.bun.price}
                thumbnail={props.orders.bun.image}
              />
            </div>}


      </div>
      <div className={bConst.bottom}>
        <p className="text text_type_digits-medium">{sum}</p>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {setOpen(true); sendOrder()}}
        >
          Оформить заказ
        </Button>
{open && post.result &&

  <Modal onClose={() => setOpen(false)}> {}
    <PostContext.Provider value={{post}}>
          <OrderDetails />
          </PostContext.Provider>
        </Modal>
       
}
        
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  orders: PropTypes.objectOf(PropTypes.shape({
    bun: PropTypes.object,
    main: PropTypes.array,
  })).isRequired
}; 