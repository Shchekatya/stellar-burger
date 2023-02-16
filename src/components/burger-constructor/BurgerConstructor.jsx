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
    () => props.orders.reduce((acc, cur) => acc + cur.price, 0),
    [props.orders]
  );

  const state= useContext(IngredientContext); 
  const items=state.state.items;

  return (
    <div className={bConst.right}>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className={bConst.list}
      >
        {props.orders.filter(e => e.type==='bun').map((order) => (
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
{details &&
<Modal onClose={() => setDetails(false)}>
              <IngredientDetails items={items} id={order._id} />
            </Modal>
}
            
          </>
        ))}
        {props.orders.filter(e => e.type!='bun').map((order) => (
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
  })).isRequired,
}; 