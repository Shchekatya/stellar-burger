import Ing from "../ingredients/ingredients.module.css";
import { IngredientSingle } from "./ingredient-single";
import { useSelector } from "../../services/hooks/hooks";
import { TItem } from "./ingredient-single";

type Prop = {
  type: string;
  items: Array<TItem>;
};

export const Ingredients = (props: Prop) => {
  const items = useSelector((state) => state.loadIngredients.items);

  return (
    <div className={Ing.show}>
      {items ? (
        items
          .filter((e) => e.type === props.type)
          .map((item) => <IngredientSingle item={item} key={item._id} />)
      ) : (
        <div>Нет в наличии</div>
      )}
    </div>
  );
};

export default Ingredients;
