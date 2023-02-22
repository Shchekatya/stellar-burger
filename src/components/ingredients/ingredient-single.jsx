import { useDispatch, useSelector } from "react-redux";
import { SHOW_ITEM,HIDE_ITEM } from "../../services/actions/actions";
import { useDrag } from "react-dnd";
import Ing from "../ingredients/ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/Modal";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";
import PropTypes from 'prop-types';

export const IngredientSingle = ({ item }) => {


  const ItemActive = useSelector((state) => state.showItem.item);


  const [, dragRef] = useDrag({
    type: "items",
    item: { item },
  });

  const dispatch = useDispatch();
  const showItem = (item) => {  
    dispatch({
      type: SHOW_ITEM,
      payload: item,
    });
  };
  const hideItem = () => {  
    dispatch({
      type: HIDE_ITEM,    
    });
  };

  return (
    <>
      <div
        ref={dragRef}
        key={item._id}
        onClick={() => {    
          showItem(item);
        }}
        className={Ing.card}
      >
        <img src={item.image} alt={item.name} />
        <p className="text text_type_digits-default">
          {item.price}
          <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-small">{item.name}</p>
      </div>
      {ItemActive && (
        <Modal onClose={() => hideItem()}>
          <IngredientDetails item={item} />
        </Modal>
      )}
    </>
  );
};

IngredientSingle.propTypes = {
  item: PropTypes.object.isRequired,
}; 