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



export const BurgerConstructor = (props) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const sum = useMemo(
    () => (props.orders.main.reduce((acc, cur) => acc + cur.price, 0) + (props.orders.bun && props.orders.bun.price*2)),
    [props.orders]
  );

  const sendOrder=async (url = 'https://norma.nomoreparties.space/api/orders', data = {"ingredients": ["60d3b41abdacab0026a733c6","60d3b41abdacab0026a733ca"]}) => {   
    let response = await fetch(url, {
      method: 'POST',      
      body: JSON.stringify(data),
    });
    let result = await response.json();
alert(result.message);
  };

  const state= useContext(IngredientContext); 
  const items=state.state.items;
console.log(props.orders.main)
console.log(props.orders.bun)
  return (
    <div className={bConst.right}>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className={bConst.list}
      >
         {props.orders.bun && <div onClick={() => setDetails(true)}>
              <ConstructorElement
                type={props.orders.bun.type}
                isLocked={true}
                text={props.orders.bun.name}
                price={props.orders.bun.price}
                thumbnail={props.orders.bun.image}
              />
            </div>}
       
        {props.orders.main.map((order) => (
          <>
            <div key={order._id} onClick={() => setDetails(true)}>
              <ConstructorElement
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
        ))}
{props.orders.bun && <div onClick={() => setDetails(true)}>
              <ConstructorElement
                type={props.orders.bun.type}
                isLocked={true}
                text={props.orders.bun.name}
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
{open &&
  <Modal onClose={() => setOpen(false)}>
          <OrderDetails />
        </Modal>
}
        
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,    
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })),
}; 