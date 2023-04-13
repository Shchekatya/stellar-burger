import Ing from "../ingredients/ingredients.module.css";
import { IngredientSingle } from "./ingredient-single";
import { useSelector } from "../../services/hooks/hooks";

type Prop= {
  type: string
items:[]
}

type TE= {
  type:string
}
type TItem ={ 
  _id: string
}
export const Ingredients = (props:Prop) => {
  const items = useSelector((state:any) => state.loadIngredients.items);

  return (
    <div className={Ing.show}>
      {items ? (
        items
          .filter((e:TE) => e.type === props.type)
          .map((item:TItem) => (
            <IngredientSingle item={item} key={item._id} />
          ))
      ) : (
        <div>Нет в наличии</div>
      )}
    </div>
  );
};

export default Ingredients;
