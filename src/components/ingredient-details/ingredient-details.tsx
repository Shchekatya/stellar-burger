import detailsStyle from "../ingredient-details/ingredient-details.module.css";
import { useParams } from "react-router-dom";
import {TItem} from "../ingredients/ingredient-single";
import { useSelector } from "../../services/hooks/hooks";

export const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const item = useSelector((state) => {
    return state.loadIngredients.items.find(
      (item:TItem) => item._id === ingredientId
    );
  });

  if (!item) {
    return null;
  }

  return (
    <div className={detailsStyle.container}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <img src={item.image} alt={item.name} />
      <h2 className="text text_type_main-medium">{item.name}</h2>
      <div className={detailsStyle.calories}>
        <p className="mr-5 text text_type_main-small">
          Калории,ккал
          <br /> {item.calories}
        </p>
        <p className="mr-5 text text_type_main-small">
          Белки,г
          <br /> {item.proteins}
        </p>
        <p className="mr-5 text text_type_main-small">
          Жиры,г
          <br /> {item.fat}
        </p>
        <p className=" text text_type_main-small">
          Углеводы,г
          <br /> {item.carbohydrates}
        </p>
      </div>
    </div>
  );
};
