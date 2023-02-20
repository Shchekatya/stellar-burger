import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Ing from "../ingredients/ingredients.module.css";
import { useDispatch } from "react-redux";
import { SHOW_ITEM } from "../../services/actions/actions";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";

export const Ingredients = (props) => {
  const [details, setDetails] = useState(false);
  const dispatch = useDispatch();
  const showItem = (item) => {
    dispatch({
      type: SHOW_ITEM,
      payload: item,
    });
  };
  return (
    <div className={Ing.show}>
      {props.items
        .filter((e) => e.type === props.type)
        .map((item) => (        
          <>            
            <div
              key={item._id}
              onClick={() => {props.onAdd(item);setDetails(true);showItem(item)}}
              className={Ing.card}              
            >
              <img src={item.image} alt={item.name} />
              <p className="text text_type_digits-default">
                {item.price}
                <CurrencyIcon type="primary" />
              </p>
              <p className="text text_type_main-small">{item.name}</p>              
            </div>
            
            {details && (
              <Modal onClose={() => setDetails(false)}>
                <IngredientDetails item={item} />              
              </Modal>
            )}          
          </>
         
        )) }
    </div>
  );
};

Ingredients.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Ingredients;
