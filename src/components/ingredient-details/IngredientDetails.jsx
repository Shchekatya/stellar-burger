import detailsStyle from "../ingredient-details/ingredient-details.module.css";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

export const IngredientDetails = () => {
  const item = useSelector(state => state.showItem.item)
 

  return (
    <div className={detailsStyle.container}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <img src={item.image} alt={item.name}/>
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


