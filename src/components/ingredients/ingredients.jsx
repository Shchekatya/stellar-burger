import Ing from "../ingredients/ingredients.module.css";
import { useSelector } from "react-redux";
import { IngredientSingle } from "./ingredient-single";
export const Ingredients = (props) => {
  const items = useSelector((state) => state.loadIngredients.items);

  return (
    <div className={Ing.show}>
      {items ? (
        items
          .filter((e) => e.type === props.type)
          .map((item) => <IngredientSingle item={item} onAdd={props.onAdd} key={item._id}/>)
      ) : (
        <div>Нет в наличии</div>
      )}
    </div>
  );
};

export default Ingredients;
