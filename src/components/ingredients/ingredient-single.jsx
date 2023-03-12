import { useDispatch, useSelector } from "react-redux";
import { SHOW_ITEM, HIDE_ITEM } from "../../services/actions/actions";
import { useDrag } from "react-dnd";
import Ing from "../ingredients/ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/Modal";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

export const IngredientSingle = ({ item }) => {
  const ItemActive = useSelector((state) => state.showItem.item);
  const location = useLocation();
  const ingredientId = item['_id'];
 

  const [, dragRef] = useDrag({
    type: "items",
    item: { item },
  });


  return (
    <>
    
    <Link
      key={ingredientId}
      to={`/ingredients/${ingredientId}`}
      state={{ background: location }}
      className={Ing.link}
    >
      <div
        ref={dragRef}       
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
        <Modal>
          <IngredientDetails item={item} />
        </Modal>
      )}
      </Link>
    </>
  );
};

IngredientSingle.propTypes = {
  item: PropTypes.object.isRequired,
};
