import { useDispatch, useSelector } from "react-redux";
import Ing from "../ingredients/ingredients.module.css";
import { useDrag } from "react-dnd";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal-ingredient/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";


export const IngredientSingle = ({ item }) => {
  const ItemActive = useSelector((state) => state.showItem.item);
  const orders = useSelector((state) => state.changeConstructor);
  const orderArr = orders.main.map((item) => item._id.toString());
  orders.bun && orderArr.push(orders.bun._id);
  const location = useLocation();
  const ingredientId = item["_id"];
  const [, dragRef] = useDrag({
    type: "items",
    item: { item },
  });

let count=0;
    orderArr.map(e=>{
      if(e===item._id) {
    count++
      }
    })   

  
  return (
    <>
     
      <Link
        key={ingredientId}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location }}
        className={Ing.link}
      >
        <div ref={dragRef} className={Ing.card}>
        {count!=0&&<div className={Ing.count}>{count}</div>}
          
          <img src={item.image} alt={item.name} />
          <p className="text text_type_digits-default">
            {item.price}
            <CurrencyIcon type="primary" />
          </p>
          <p className="text text_type_main-small">{item.name}</p>
        </div>  
      </Link>
    </>
  );
};

IngredientSingle.propTypes = {
  item: PropTypes.object.isRequired,
};
